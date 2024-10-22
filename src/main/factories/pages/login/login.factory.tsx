import React from 'react';
import { Login } from '@/presentation/pages';
import { remoteAuthenticationFactory } from '../../usecases/authentication/remote-authentication.factory';
import { loginValidationFactory } from './login-validation.factory';

export const loginFactory: React.FC = () => {
  const remoteAuthentication = remoteAuthenticationFactory();
  const loginValidation = loginValidationFactory();
  return (<Login authentication={remoteAuthentication} validation={loginValidation} />);
};