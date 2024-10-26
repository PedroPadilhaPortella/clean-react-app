import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { RegisterAccount } from '@/domain/usecases';
import { Footer, FormStatus, Header, Input } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form.context';
import { Validation } from '@/presentation/protocols/validation';

import styles from './register.module.scss';

type Props = {
  validation: Validation
  registerAccount: RegisterAccount
};

const Register: React.FC<Props> = ({ validation, registerAccount }: Props) => {

  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmError: '',
    mainError: ''
  });

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmError: validation.validate('passwordConfirm', state.passwordConfirm)
    });
  }, [state.name, state.email, state.password, state.passwordConfirm]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    setState({ ...state, isLoading: true });
    await registerAccount.register({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirm
    });
  };

  const isThereAnyError = (): boolean => {
    return !!state.nameError ||
      !!state.emailError ||
      !!state.passwordError ||
      !!state.passwordConfirmError;
  };

  return (
    <div className={styles.register}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
          <h2>Crie uma conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirm" placeholder="Confirme a sua senha" />
          <button className={styles.submit} disabled={isThereAnyError()} type="submit" data-testid="submit" >
            Criar conta
          </button>
          <Link data-testid="login" to="/login" className={styles.link}>Já tem uma conta? Faça Login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Register;