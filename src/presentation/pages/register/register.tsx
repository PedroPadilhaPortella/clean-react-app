import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { RegisterAccount } from '@/domain/usecases';
import { Footer, FormStatus, LoginHeader, Input, SubmitButton } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form.context';
import { Validation } from '@/presentation/protocols/validation';

import styles from './register.module.scss';
import { ApiContext } from '@/presentation/contexts';

type Props = {
  validation: Validation
  registerAccount: RegisterAccount
};

const Register: React.FC<Props> = ({ validation, registerAccount }: Props) => {
  const history = useHistory();
  const { setCurrentAccount } = useContext(ApiContext);

  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
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

  useEffect(() => { validate('name'); }, [state.name]);
  useEffect(() => { validate('email'); }, [state.email]);
  useEffect(() => { validate('password'); }, [state.password]);
  useEffect(() => { validate('passwordConfirm'); }, [state.passwordConfirm]);

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirm } = state;
    const formData = { name, email, password, passwordConfirm };

    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }));

    setState(old => ({ ...old, isFormInvalid: !!old.nameError || !!old.emailError || !!old.passwordError || !!old.passwordConfirmError }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      if (state.isLoading || state.isFormInvalid) return;

      setState(old => ({ ...old, isLoading: true }));
      const account = await registerAccount.register({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirm
      });
      setCurrentAccount(account);
      history.replace('/');
    } catch (error) {
      setState(old => ({ ...old, isLoading: false, mainError: error.message }));
    }
  };

  return (
    <div className={styles.register}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
          <h2>Crie uma conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirm" placeholder="Confirme a sua senha" />
          <SubmitButton text="Criar conta" />
          <Link data-testid="login" replace to="/login" className={styles.link}>
            Já tem uma conta? Faça Login
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Register;