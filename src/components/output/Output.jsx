import PropTypes from 'prop-types';
import styles from './Output.module.scss';

export const Output = ({ output, error }) => {
  return (
    <div className={styles.outputContainer}>
      <div className={styles.output}>
        {output ? (
          <div>{output}</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <div className={styles.description}>Результат выполнения кода будет отображен здесь.</div>  // Изменено с <pre> на <div>
        )}
      </div>
    </div>
  );
};

Output.propTypes = {
  output: PropTypes.string,
  error: PropTypes.string,
};