import { LocalStorageAdapter } from './local-storage.adapter';
import 'jest-localstorage-mock';
import faker from 'faker';

const createSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};

describe('LocalStorageAdapter', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test('Should call localStorage.removeItem when value is null', () => {
    const sut = createSut();
    const key = faker.database.column();
    sut.set(key, null);
    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test('Should call localStorage.setItem with correct values', () => {
    const sut = createSut();
    const key = faker.database.column();
    const value = faker.random.objectElement<{}>();
    sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  test('Should call localStorage.getItem with correct value', () => {
    const sut = createSut();
    const key = faker.database.column();
    const value = faker.random.objectElement<{}>();

    const localStorageGetItemSpy = jest.spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(value));

    const storedData = sut.get(key);

    expect(storedData).toEqual(value);
    expect(localStorageGetItemSpy).toHaveBeenCalledWith(key);
  });
});