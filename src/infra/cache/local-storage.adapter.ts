import { GetStorage, SetStorage } from '@/data/protocols';

export class LocalStorageAdapter implements GetStorage, SetStorage {
  get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key: string, value: object): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }
}