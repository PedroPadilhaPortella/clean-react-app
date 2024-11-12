import faker from 'faker';

import { LocalAccessToken } from './local-access-token';
import { StorageMock } from '@/data/test';
import { UnexpectedError } from '@/domain/errors';

type SutTypes = {
  storageMock: StorageMock
  sut: LocalAccessToken
};

const createSut = (): SutTypes => {
  const storageMock = new StorageMock();
  const sut = new LocalAccessToken(storageMock);
  return { storageMock, sut };
};

describe('LocalAccessToken', () => {

  test('Should set storage with correct value', async () => {
    const { sut, storageMock } = createSut();
    const accessToken = faker.random.uuid();
    await sut.save(accessToken);

    expect(storageMock.key).toBe('accessToken');
    expect(storageMock.value).toBe(accessToken);
  });

  test('Should throw an error if set storage throws', async () => {
    const { sut, storageMock } = createSut();
    jest.spyOn(storageMock, 'set').mockRejectedValueOnce(new Error());
    const promise = sut.save(faker.random.uuid());
    await expect(promise).rejects.toThrow(new Error());
  });

  test('Should throw when accessToken is not defined', async () => {
    const { sut } = createSut();
    const promise = sut.save(undefined);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});