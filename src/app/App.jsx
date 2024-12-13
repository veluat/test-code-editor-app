import {CodeEditor} from '../components/code-editor/CodeEditor.jsx';
import style from './App.module.scss';

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