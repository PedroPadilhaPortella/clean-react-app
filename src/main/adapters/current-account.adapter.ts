import { AccountModel } from '@/domain/models';
import { localStorageAdapterFactory } from '../factories/usecases';

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  localStorageAdapterFactory().set('currentAccount', account);
};

export const getCurrentAccountAdapter = (): AccountModel => {
  return localStorageAdapterFactory().get('currentAccount');
};