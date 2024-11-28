import faker from 'faker';

import { AuthorizeHttpGetClientDecorator } from './authorize-http-get-client.decorator';
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from '@/data/test';
import { mockAccountModel } from '@/domain/test';

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator
  getStorageSpy: GetStorageSpy
  httpGetClientSpy: HttpGetClientSpy
};

const createSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy, httpGetClientSpy);
  return { sut, getStorageSpy, httpGetClientSpy };
};

describe('AuthorizeHttpGetClientDecorator', () => {

  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = createSut();
    await sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe('currentAccount');
  });

  test('Should not add headers if GetStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = createSut();
    const request = { url: faker.internet.url(), headers: { field: faker.random.words() } };

    await sut.get(request);

    expect(httpGetClientSpy.url).toBe(request.url);
    expect(httpGetClientSpy.headers).toEqual(request.headers);
  });

  test('Should add headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = createSut();
    getStorageSpy.value = mockAccountModel();
    const request = { url: faker.internet.url() };

    await sut.get(request);

    expect(httpGetClientSpy.url).toBe(request.url);
    expect(httpGetClientSpy.headers).toEqual({ 'x-access-token': getStorageSpy.value.accessToken });
  });

  test('Should merge headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = createSut();
    getStorageSpy.value = mockAccountModel();
    const field = faker.random.words();
    const request = { url: faker.internet.url(), headers: { field } };

    await sut.get(request);

    expect(httpGetClientSpy.url).toBe(request.url);
    expect(httpGetClientSpy.headers).toEqual({
      field, 'x-access-token': getStorageSpy.value.accessToken
    });
  });

  test('Should return the same result as HttpGetClient', async () => {
    const { sut, httpGetClientSpy } = createSut();
    const response = await sut.get(mockGetRequest());
    expect(response).toEqual(httpGetClientSpy.response);
  });
});