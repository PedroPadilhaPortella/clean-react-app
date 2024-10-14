import React, { useContext } from 'react';
import styles from './input.module.scss';
import Context from '@/presentation/contexts/form/form.context';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context);
  const error = errorState[props.name];

  const getStatus = (): string => '🔴';

  const getTitle = (): string => error;

  return (
    <div className={styles.inputWrap}>
      <input {...props} />
      <span data-testid={`${props.name}-status`} title={getTitle()} className={styles.status}>
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;