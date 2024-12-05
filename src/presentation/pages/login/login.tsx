import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Footer, LoginHeader, Input, FormStatus, SubmitButton } from '@/presentation/components';
import { Validation } from '@/presentation/protocols/validation';
import Context from '@/presentation/contexts/form/form.context';
import { Authentication } from '@/domain/usecases';

import styles from './login.module.scss';
import { ApiContext } from '@/presentation/contexts';

type Props = {
  validation: Validation
  authentication: Authentication
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const history = useHistory();
  const { setCurrentAccount } = useContext(ApiContext);

  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  });

  useEffect(() => { validate('email'); }, [state.email]);

  useEffect(() => { validate('password'); }, [state.password]);

  const validate = (field: string): void => {
    const { email, password } = state;
    const formData = { email, password };

    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }));
    setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      if (state.isLoading || state.isFormInvalid) return;

      setState(old => ({ ...old, isLoading: true }));
      const account = await authentication.auth({ email: state.email, password: state.password });
      setCurrentAccount(account);
      history.replace('/');
    } catch (error) {
      setState(old => ({ ...old, isLoading: false, mainError: error.message }));
    }
  };

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <SubmitButton text="Entrar" />
          <Link data-testid="register" to="/register" className={styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;