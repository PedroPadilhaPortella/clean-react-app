import { Storage } from '@/data/protocols/cache/storage';

export class LocalStorageAdapter implements Storage {
  async get(key: string): Promise<any> {
    return Promise.resolve(JSON.parse(localStorage.getItem(key)));
  }

  async set(key: string, value: object): Promise<void> {
    await Promise.resolve(localStorage.setItem(key, JSON.stringify(value)));
  }
}