import faker from 'faker';

import { AuthenticationParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid()
});
