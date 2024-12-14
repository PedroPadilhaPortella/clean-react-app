import React from 'react';
import Spinner from '../spinner';
import styles from './form-status.module.scss';

type Props = {
  state: any
};

const FormStatus: React.FC<Props> = ({ state }: Props) => {
  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {state.isLoading && <Spinner className={styles.spinner} />}
      {state.mainError && <span data-testid="main-error" className={styles.error}>{state.mainError}</span>}
    </div>
  );
};

export default FormStatus;