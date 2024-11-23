import { Storage } from '@/data/protocols';

export class StorageMock implements Storage {
  key: string;
  value: any;

  async get(key: string): Promise<any> {
    this.key = key;
    return Promise.resolve({});
  }

  async set(key: string, value: any): Promise<void> {
    this.key = key;
    this.value = value;
    return Promise.resolve();
  }
}