import {CodeEditor} from '../components/code-editor/CodeEditor.jsx';
import style from './App.module.scss';
import { createServer } from 'miragejs';

createServer({
  routes() {
    this.namespace = 'api'; // Установите пространство имен, если необходимо

    this.post('/run', (schema, request) => {
      const { code } = JSON.parse(request.requestBody);
      let output = '';
      let error = null;

      if (!code.trim()) {
        error = 'Ошибка: Код не может быть пустым.';
      } else if (code.includes('console.log')) {
        const matches = code.match(/console\.log\((['"`])(.+?)\1\);?/);
        if (matches) {
          output = matches[2];
        } else {
          error = 'Ошибка: Неверный синтаксис console.log';
        }
      } else if (code.includes('print')) {
        const matches = code.match(/print\((['"`])(.+?)\1\);?/);
        if (matches) {
          output = matches[2];
        } else {
          error = 'Ошибка: Неверный синтаксис print';
        }
      }

      return { output, error };
    });
  },
});
const App = () => {
  return (
    <div className={style.appContainer}>
      <h1>Упрощённый онлайн редактор кода</h1>
      <p>
        Для получения результата используйте команды <code>console.log()</code> для JavaScript и <code>print()</code> для Python.
      </p>
      <CodeEditor />
    </div>
  );
};

export default App;