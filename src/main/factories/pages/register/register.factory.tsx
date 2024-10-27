import React from 'react';

import { localAccessTokenFactory, remoteRegisterAccountFactory } from '@/main/factories/usecases';
import { Register } from '@/presentation/pages';
import { registerValidationFactory } from './register-validation.factory';

export const registerFactory: React.FC = () => {
  const remoteRegisterAccount = remoteRegisterAccountFactory();
  const registerValidation = registerValidationFactory();
  const accessToken = localAccessTokenFactory();
  return (
    <Register
      registerAccount={remoteRegisterAccount}
      validation={registerValidation}
      accessToken={accessToken}
    />
  );
};