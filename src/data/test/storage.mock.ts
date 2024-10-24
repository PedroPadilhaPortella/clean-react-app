import { Storage } from '@/data/protocols';

export class StorageMock implements Storage {
  key: string;
  value: any;

  async set(key: string, value: any): Promise<void> {
    this.key = key;
    this.value = value;
    return Promise.resolve();
  }
}