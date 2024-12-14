import PropTypes from 'prop-types';
import style from './Output.module.scss';

export const Output = ({ output, error }) => {
  return (
    <div className={style.outputContainer}>
      <div className={style.output}>
        {output ? (
          <div>{output}</div>
        ) : error ? (
          <div className={style.error}>{error}</div>
        ) : (
          <div className={style.description}>
            Результат выполнения кода будет отображен здесь.
          </div>
        )}
      </div>
    </div>
  );
};

Output.propTypes = {
  output: PropTypes.string,
  error: PropTypes.string,
};
