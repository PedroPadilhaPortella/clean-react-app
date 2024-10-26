import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Footer, Header, Input, FormStatus } from '@/presentation/components';
import { Validation } from '@/presentation/protocols/validation';
import Context from '@/presentation/contexts/form/form.context';
import { Authentication, AccessToken } from '@/domain/usecases';

import styles from './login.module.scss';

type Props = {
  validation: Validation
  authentication: Authentication
  accessToken: AccessToken
};

const Login: React.FC<Props> = ({ validation, authentication, accessToken }: Props) => {
  const history = useHistory();

  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    });
  }, [state.email, state.password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      if (state.isLoading || state.emailError || state.passwordError) return;

      setState({ ...state, isLoading: true });
      const account = await authentication.auth({ email: state.email, password: state.password });
      await accessToken.save(account.accessToken);
      history.replace('/');
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message });
    }

  };

  const disableButton = (): boolean => {
    return !!state.emailError || !!state.passwordError;
  };

  return (
    <div className={styles.login}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button className={styles.submit} disabled={disableButton()} type="submit" data-testid="submit" >
            Entrar
          </button>
          <Link data-testid="register" to="/register" className={styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;