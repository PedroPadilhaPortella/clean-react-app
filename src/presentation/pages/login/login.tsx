import React, { useEffect, useState } from 'react';
import styles from './login.module.scss';
import { Footer, Header, Input, FormStatus } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form.context';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication } from '@/domain/usecases';
import { Link } from 'react-router-dom';

type Props = {
  validation: Validation
  authentication: Authentication
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
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
      localStorage.setItem('accessToken', account.accessToken);
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message });
    }

  };

  return (
    <div className={styles.login}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button className={styles.submit} disabled={!!state.emailError || !!state.passwordError} type="submit" data-testid="submit" >
            Entrar
          </button>
          <Link data-testid="signup" to="/signup" className={styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;