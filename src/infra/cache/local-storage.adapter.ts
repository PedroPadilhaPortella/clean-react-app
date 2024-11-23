import { Storage } from '@/data/protocols/cache/storage';

export class LocalStorageAdapter implements Storage {
  get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}