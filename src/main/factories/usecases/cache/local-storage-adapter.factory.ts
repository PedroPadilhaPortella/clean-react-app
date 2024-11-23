import { LocalStorageAdapter } from '@/infra/cache/local-storage.adapter';
import { Storage } from '@/data/protocols';

export const localStorageAdapterFactory = (): Storage => {
  return new LocalStorageAdapter();
};