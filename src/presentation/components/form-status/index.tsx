import React, { useContext } from 'react';
import Spinner from '../spinner';
import styles from './form-status.module.scss';
import Context from '@/presentation/contexts/form/form.context';

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context);

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {isLoading && <Spinner className={styles.spinner} />}
      {errorMessage && <span className={styles.error}>Erro</span>}
    </div>
  );
};

export default FormStatus;