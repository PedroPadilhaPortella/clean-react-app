import { AccountModel } from '@/domain/models';
import { UnexpectedError } from '@/domain/errors';
import { localStorageAdapterFactory } from '../factories/usecases';

export const setCurrentAccountAdapter = async (account: AccountModel): Promise<void> => {
  if (!account?.accessToken) throw new UnexpectedError();
  await localStorageAdapterFactory().set('currentAccount', account);
};