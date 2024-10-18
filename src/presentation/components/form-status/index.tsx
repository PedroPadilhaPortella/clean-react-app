import React, { useContext } from 'react';
import Spinner from '../spinner';
import styles from './form-status.module.scss';
import Context from '@/presentation/contexts/form/form.context';

const FormStatus: React.FC = () => {
  const { state } = useContext(Context);

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {state.isLoading && <Spinner className={styles.spinner} />}
      {state.mainError && <span data-testid="main-error" className={styles.error}>{state.mainError}</span>}
    </div>
  );
};

export default FormStatus;