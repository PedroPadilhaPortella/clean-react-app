import React, { useEffect, useState } from 'react';
import styles from './login.module.scss';
import { Footer, Header, Input, FormStatus } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form.context';
import { Validation } from '@/presentation/protocols/validation';

type Props = {
  validation: Validation
};

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: ''
  });

  useEffect(() => {
    validation.validate({ email: state.email });
  }, [state.email]);

  useEffect(() => {
    validation.validate({ password: state.password });
  }, [state.password]);

  return (
    <div className={styles.login}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button className={styles.submit} type="submit" data-testid="submit" disabled>Entrar</button>
          <span className={styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;