import React, { useContext, useRef } from 'react';
import styles from './input.module.scss';
import Context from '@/presentation/contexts/form/form.context';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context);
  const error = state[`${props.name}Error`];
  const inputRef = useRef<HTMLInputElement>();

  const getStatus = (): string => error ? '🔴' : '🟢';

  const getTitle = (): string => error || 'Tudo certo!';

  const focus = (): void => inputRef.current.focus();

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <div className={styles.inputWrap}>
      <input
        {...props}
        data-testid={props.name}
        ref={inputRef}
        placeholder=" "
        onChange={handleChange}
      />
      <label onClick={focus}>
        {props.placeholder}
      </label>
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={styles.status}>
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;