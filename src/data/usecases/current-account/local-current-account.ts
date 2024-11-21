import { CurrentAccount } from '@/domain/usecases';
import { Storage } from '@/data/protocols/cache/storage';
import { UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';

export class LocalCurrentAccount implements CurrentAccount {

  constructor(private readonly storage: Storage) { }

  async update(account: AccountModel): Promise<void> {
    if (!account?.accessToken) throw new UnexpectedError();
    await this.storage.set('currentAccount', JSON.stringify(account));
  }
}