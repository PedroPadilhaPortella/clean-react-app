import React from 'react';

import { localCurrentAccountFactory, remoteRegisterAccountFactory } from '@/main/factories/usecases';
import { Register } from '@/presentation/pages';
import { registerValidationFactory } from './register-validation.factory';

export const registerFactory: React.FC = () => {
  const remoteRegisterAccount = remoteRegisterAccountFactory();
  const registerValidation = registerValidationFactory();
  const currentAccount = localCurrentAccountFactory();
  return (
    <Register
      registerAccount={remoteRegisterAccount}
      validation={registerValidation}
      currentAccount={currentAccount}
    />
  );
};