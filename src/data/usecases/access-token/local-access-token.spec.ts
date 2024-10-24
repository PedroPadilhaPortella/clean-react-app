import faker from 'faker';

import { LocalAccessToken } from './local-access-token';
import { SetStorageMock } from '@/data/test/storage.mock';

type SutTypes = {
  setStorageMock: SetStorageMock
  sut: LocalAccessToken
};

const createSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalAccessToken(setStorageMock);
  return { setStorageMock, sut };
};

describe('LocalAccessToken', () => {

  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = createSut();
    const accessToken = faker.random.uuid();
    await sut.save(accessToken);

    expect(setStorageMock.key).toBe('accessToken');
    expect(setStorageMock.value).toBe(accessToken);
  });
});