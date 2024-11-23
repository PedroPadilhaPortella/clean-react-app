import { LocalStorageAdapter } from './local-storage.adapter';
import 'jest-localstorage-mock';
import faker from 'faker';
import { AccountModel } from '@/domain/models';

const createSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};

describe('LocalStorageAdapter', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test('Should call localStorage with correct values', async () => {
    const sut = createSut();
    const key = faker.database.column();
    const value = faker.random.objectElement<AccountModel>();
    await sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });
});