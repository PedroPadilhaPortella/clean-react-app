import React, { useContext } from 'react';

import { SurveyContext } from '@/presentation/pages/survey-list/components';

import styles from './error.module.scss';

const Error: React.FC = () => {
  const { state } = useContext(SurveyContext);

  return (
    <div className={styles.error}>
      <span data-testid="error">{state.error}</span>
      <button>Recarregar</button>
    </div>
  );
};

export default Error;