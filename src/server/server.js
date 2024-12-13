import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/run', (req, res) => {
  const { code } = req.body;
  let output = '';
  let error = null;

  if (!code.trim()) {
    error = 'Ошибка: Код не может быть пустым.';
  } else if (code.includes('console.log')) {
    // Обработка JavaScript
    const matches = code.match(/console\.log\((['"`])(.+?)\1\);?/);
    if (matches) {
      output = matches[2];
    } else {
      error = 'Ошибка: Неверный синтаксис console.log';
    }
  } else if (code.includes('print')) {
    // Обработка Python
    const matches = code.match(/print\((['"`])(.+?)\1\);?/);
    if (matches) {
      output = matches[2];
    } else {
      error = 'Ошибка: Неверный синтаксис print';
    }
  } else {
    output = code;
  }

  res.json({ output, error });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});