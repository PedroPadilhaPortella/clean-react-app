import React, { useState } from 'react';
import styles from './login.module.scss';
import { Footer, Header, Input, FormStatus } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form.context';

const Login: React.FC = () => {
  const [state] = useState({ isLoading: false });

  const [errorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: ''
  });

  return (
    <div className={styles.login}>
      <Header />
      <Context.Provider value={{ state, errorState }}>
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