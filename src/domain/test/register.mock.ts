import faker from 'faker';

import { RegisterParams } from '@/domain/usecases';

export const mockRegister = (): RegisterParams => {
  const password = faker.internet.password();

  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: password,
    passwordConfirmation: password
  };
};