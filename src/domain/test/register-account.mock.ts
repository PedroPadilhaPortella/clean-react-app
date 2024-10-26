import faker from 'faker';

import { RegisterAccountParams } from '@/domain/usecases';

export const mockRegister = (): RegisterAccountParams => {
  const password = faker.internet.password();

  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: password,
    passwordConfirmation: password
  };
};