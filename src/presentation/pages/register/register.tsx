import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AccessToken, RegisterAccount } from '@/domain/usecases';
import { Footer, FormStatus, Header, Input, SubmitButton } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form.context';
import { Validation } from '@/presentation/protocols/validation';

import styles from './register.module.scss';

type Props = {
  validation: Validation
  registerAccount: RegisterAccount
  accessToken: AccessToken
};

const Register: React.FC<Props> = ({ validation, registerAccount, accessToken }: Props) => {
  const history = useHistory();

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

  useEffect(() => {
    const nameError = validation.validate('name', state.name);
    const emailError = validation.validate('email', state.email);
    const passwordError = validation.validate('password', state.password);
    const passwordConfirmError = validation.validate('passwordConfirm', state.passwordConfirm);

    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmError
    });
  }, [state.name, state.email, state.password, state.passwordConfirm]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      if (state.isLoading || state.isFormInvalid) return;

      setState({ ...state, isLoading: true });
      const response = await registerAccount.register({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirm
      });
      await accessToken.save(response.accessToken);
      history.replace('/');
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message });
    }
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