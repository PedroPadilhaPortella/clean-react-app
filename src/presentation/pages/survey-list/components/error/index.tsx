import React, { useContext } from 'react';

import { SurveyContext } from '@/presentation/pages/survey-list/components';

import styles from './error.module.scss';

const Error: React.FC = () => {
  const { state, setState } = useContext(SurveyContext);

  const reload = (): void => {
    setState({ surveys: [], error: '', reload: !state.reload });
  };

  return (
    <div className={styles.error}>
      <span data-testid="error">{state.error}</span>
      <button data-testid="reload" onClick={reload}>Tentar novamente</button>
    </div>
  );
};

export default Error;