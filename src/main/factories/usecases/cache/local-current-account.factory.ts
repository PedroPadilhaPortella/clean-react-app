import { LocalStorageAdapter } from '@/infra/cache';
import { LocalCurrentAccount } from '@/data/usecases';
import { CurrentAccount } from '@/domain/usecases';

export const localCurrentAccountFactory = (): CurrentAccount => {
  const localStorageAdapter = new LocalStorageAdapter();
  return new LocalCurrentAccount(localStorageAdapter);
};