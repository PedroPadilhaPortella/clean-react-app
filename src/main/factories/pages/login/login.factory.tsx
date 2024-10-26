import React from 'react';

import { remoteAuthenticationFactory, localAccessTokenFactory } from '@/main/factories/usecases';
import { loginValidationFactory } from './login-validation.factory';
import { Login } from '@/presentation/pages';

export const loginFactory: React.FC = () => {
  const remoteAuthentication = remoteAuthenticationFactory();
  const loginValidation = loginValidationFactory();
  const accessToken = localAccessTokenFactory();
  return (
    <Login
      authentication={remoteAuthentication}
      validation={loginValidation}
      accessToken={accessToken}
    />
  );
};