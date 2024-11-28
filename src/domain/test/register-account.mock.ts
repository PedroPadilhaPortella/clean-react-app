import faker from 'faker';

import { RegisterAccount } from '@/domain/usecases';
import { mockAccountModel } from './account.mock';

export const mockRegisterParams = (): RegisterAccount.Params => {
  const password = faker.internet.password();

  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: password,
    passwordConfirmation: password
  };
};

export const mockRegisterAccountModel = (): RegisterAccount.Model => mockAccountModel();

export class RegisterAccountSpy implements RegisterAccount {
  account = mockRegisterAccountModel();
  params: RegisterAccount.Params;
  callsCount = 0;

  async register(params: RegisterAccount.Params): Promise<RegisterAccount.Model> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}
