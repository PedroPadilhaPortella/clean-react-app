import React from 'react';

import { remoteAuthenticationFactory, localCurrentAccountFactory } from '@/main/factories/usecases';
import { loginValidationFactory } from './login-validation.factory';
import { Login } from '@/presentation/pages';

export const loginFactory: React.FC = () => {
  const remoteAuthentication = remoteAuthenticationFactory();
  const loginValidation = loginValidationFactory();
  const currentAccount = localCurrentAccountFactory();
  return (
    <Login
      authentication={remoteAuthentication}
      validation={loginValidation}
      currentAccount={currentAccount}
    />
  );
};