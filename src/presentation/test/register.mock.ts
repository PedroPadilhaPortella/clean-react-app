import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';
import { Register as RegisterAccount, RegisterParams } from '@/domain/usecases';

export class RegisterAccountSpy implements RegisterAccount {
  account = mockAccountModel();
  params: RegisterParams;
  callsCount = 0;

  async register(params: RegisterParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}