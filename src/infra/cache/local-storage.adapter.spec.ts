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

  test('Should call localStorage.setItem with correct values', async () => {
    const sut = createSut();
    const key = faker.database.column();
    const value = faker.random.objectElement<AccountModel>();
    await sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  test('Should call localStorage.getItem with correct value', async () => {
    const sut = createSut();
    const key = faker.database.column();
    const value = faker.random.objectElement<AccountModel>();

    const localStorageGetItemSpy = jest.spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(value));

    const storedData = await sut.get(key);

    expect(storedData).toEqual(value);
    expect(localStorageGetItemSpy).toHaveBeenCalledWith(key);
  });
});