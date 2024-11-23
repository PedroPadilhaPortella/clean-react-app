import { AccountModel } from '@/domain/models';
import { UnexpectedError } from '@/domain/errors';
import { localStorageAdapterFactory } from '../factories/usecases';

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) throw new UnexpectedError();
  localStorageAdapterFactory().set('currentAccount', account);
};

export const getCurrentAccountAdapter = (): AccountModel => {
  return localStorageAdapterFactory().get('currentAccount');
};