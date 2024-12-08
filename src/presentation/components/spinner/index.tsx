import React from 'react';
import styles from './spinner.module.scss';

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean
};

const Spinner: React.FC<Props> = ({ isNegative, ...props }: Props) => {
  const negativeClass = isNegative ? styles.negative : '';

  return (
    <div {...props} data-testid="spinner" className={[styles.spinner, negativeClass, props.className].join(' ')}>
      <div /><div /><div /><div />
    </div>
  );
};

export default Spinner;