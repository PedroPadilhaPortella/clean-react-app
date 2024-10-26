import { LocalStorageAdapter } from '@/infra/cache';
import { LocalAccessToken } from '@/data/usecases';
import { AccessToken } from '@/domain/usecases';

export const localAccessTokenFactory = (): AccessToken => {
  const localStorageAdapter = new LocalStorageAdapter();
  return new LocalAccessToken(localStorageAdapter);
};