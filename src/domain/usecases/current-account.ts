import { AccountModel } from '../models';

export interface CurrentAccount {
  update: (account: AccountModel) => Promise<void>
}