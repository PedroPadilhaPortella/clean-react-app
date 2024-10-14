import React, { useContext } from 'react';
import styles from './input.module.scss';
import Context from '@/presentation/contexts/form/form.context';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context);
  const error = state[`${props.name}Error`];

  const getStatus = (): string => error ? '🔴' : '🟢';

  const getTitle = (): string => error || 'Tudo certo!';

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <div className={styles.inputWrap}>
      <input data-testid={props.name} {...props} onChange={handleChange} />
      <span data-testid={`${props.name}-status`} title={getTitle()} className={styles.status}>
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;