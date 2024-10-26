import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';
import { RegisterAccount, RegisterAccountParams } from '@/domain/usecases';

export class RegisterAccountSpy implements RegisterAccount {
  account = mockAccountModel();
  params: RegisterAccountParams;
  callsCount = 0;

  async register(params: RegisterAccountParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}