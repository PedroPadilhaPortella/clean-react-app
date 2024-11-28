import { Storage } from '@/data/protocols';
import faker from 'faker';

export class GetStorageSpy implements Storage {
  key: string;
  value: any = faker.random.objectElement();

  get(key: string): any {
    this.key = key;
    return this.value;
  }

  set(key: string, value: object): void {
    this.key = key;
    this.value = value;
  }
}