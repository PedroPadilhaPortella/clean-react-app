import faker from 'faker';

import { LocalCurrentAccount } from './local-current-account';
import { StorageMock } from '@/data/test';
import { UnexpectedError } from '@/domain/errors';

type SutTypes = {
  storageMock: StorageMock
  sut: LocalCurrentAccount
};

const createSut = (): SutTypes => {
  const storageMock = new StorageMock();
  const sut = new LocalCurrentAccount(storageMock);
  return { storageMock, sut };
};

describe('LocalAccessToken', () => {

  test('Should set storage with correct value', async () => {
    const { sut, storageMock } = createSut();
    const accessToken = faker.random.uuid();
    const name = faker.name.firstName();
    const account = { accessToken, name };
    await sut.update(account);

    expect(storageMock.key).toBe('currentAccount');
    expect(storageMock.value).toBe(JSON.stringify(account));
  });

  test('Should throw an error if set storage throws', async () => {
    const { sut, storageMock } = createSut();
    jest.spyOn(storageMock, 'set').mockRejectedValueOnce(new Error());
    const account = { accessToken: faker.random.uuid(), name: faker.name.firstName() };
    const promise = sut.update(account);
    await expect(promise).rejects.toThrow(new Error());
  });

  test('Should throw when currentAccount is not defined', async () => {
    const { sut } = createSut();
    const promise = sut.update(undefined);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});