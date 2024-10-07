import { AccountModel } from '../models/account.model';
import { AuthenticationParams } from '../usecases/authentication.types';
import faker from 'faker';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid()
});
