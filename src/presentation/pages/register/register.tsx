import React from 'react';
import { Link } from 'react-router-dom';

import { Footer, FormStatus, Header, Input } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form.context';

import styles from './register.module.scss';

const Register: React.FC = () => {

  return (
    <div className={styles.register}>
      <Header />
      <Context.Provider value={{ state: {} }}>
        <form data-testid="form" className={styles.form}>
          <h2>Crie uma conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirm" placeholder="Confirme a sua senha" />
          <button className={styles.submit} type="submit" data-testid="submit" >
            Criar conta
          </button>
          <Link data-testid="signup" to="/login" className={styles.link}>Já tem uma conta? Faça Login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Register;