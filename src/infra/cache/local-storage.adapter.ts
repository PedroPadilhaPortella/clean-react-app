import { Storage } from '@/data/protocols/cache/storage';

export class LocalStorageAdapter implements Storage {
  async set(key: string, value: object): Promise<void> {
    await Promise.resolve(localStorage.setItem(key, JSON.stringify(value)));
  }
}