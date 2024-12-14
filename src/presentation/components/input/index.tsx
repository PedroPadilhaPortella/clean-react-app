import React, { useRef } from 'react';
import styles from './input.module.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  state: any
  setState: any
};

const Input: React.FC<Props> = ({ state, setState, ...props }: Props) => {
  const error = state[`${props.name}Error`];
  const inputRef = useRef<HTMLInputElement>();

  const focus = (): void => inputRef.current.focus();

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        title={error}
        data-testid={props.name}
        ref={inputRef}
        placeholder=" "
        onChange={handleChange}
      />
      <label data-testid={`${props.name}-label`} onClick={focus} title={error}>
        {props.placeholder}
      </label>
    </div>
  );
};

export default Input;