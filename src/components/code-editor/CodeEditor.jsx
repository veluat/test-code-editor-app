import { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-terminal';
import { Output } from '../output/Output.jsx';
import styles from './CodeEditor.module.scss';

export const CodeEditor = () => {
  const [code, setCode] = useState('console.log("Привет, мир!")');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleRunCode = async () => {
    const result = await runCode(code);
    if (result.error) {
      setOutput('');
      setError(result.error);
    } else {
      setError('');
      setOutput(result.output);
    }
  };

  const runCode = async (code) => {
    return fetch('/api/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => response.json())
      .then((data) => ({ output: data.output, error: data.error }))
      .catch((error) => ({ error: error.message }));
  };

  return (
    <div className={styles.container}>
      <select
        className={styles.languageSelector}
        value={language}
        onChange={(e) => {
          setLanguage(e.target.value);
          setCode('');
        }}
      >
        <option value='javascript'>JavaScript</option>
        <option value='python'>Python</option>
      </select>

      <AceEditor
        mode={language}
        theme='terminal'
        value={code}
        fontSize={16}
        onChange={setCode}
        name='code_editor'
        editorProps={{ $blockScrolling: true }}
        width='100%'
        height='400px'
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
        }}
      />

      <button className={styles.runButton} onClick={handleRunCode}>Run</button>

      <Output output={output} error={error} />
    </div>
  );
};