import React from 'react';

import styles from './error.module.scss';

type Props = {
  error: string
  reload: () => void
};

const Error: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <div className={styles.error}>
      <span data-testid="error">{error}</span>
      <button data-testid="reload" onClick={reload}>Tentar novamente</button>
    </div>
  );
};

export default Error;