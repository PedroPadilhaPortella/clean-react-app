import React from 'react';
import styles from './spinner.module.scss';

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean
};

const Spinner: React.FC<Props> = (props: Props) => {
  const negativeClass = props.isNegative ? styles.negative : '';

  return (
    <div {...props} data-testid="spinner" className={[styles.spinner, negativeClass, props.className].join(' ')}>
      <div /><div /><div /><div />
    </div>
  );
};

export default Spinner;