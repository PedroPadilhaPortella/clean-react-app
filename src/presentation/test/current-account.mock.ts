import { AccountModel } from '@/domain/models';
import { CurrentAccount } from '@/domain/usecases/current-account';

export class CurrentAccountMock implements CurrentAccount {
  account: AccountModel;

  async update(account: AccountModel): Promise<void> {
    await Promise.resolve(this.account = account);
  }
}