import faker from 'faker';

import { AuthorizeHttpClientDecorator } from './authorize-http-client.decorator';
import { GetStorageSpy, HttpClientSpy, mockHttpRequest } from '@/data/test';
import { mockAccountModel } from '@/domain/test';
import { HttpRequest } from '@/data/protocols';

type SutTypes = {
  sut: AuthorizeHttpClientDecorator
  getStorageSpy: GetStorageSpy
  httpClientSpy: HttpClientSpy
};

const createSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpClientSpy = new HttpClientSpy();
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy);
  return { sut, getStorageSpy, httpClientSpy };
};

describe('AuthorizeHttpClientDecorator', () => {

  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = createSut();
    await sut.request(mockHttpRequest());
    expect(getStorageSpy.key).toBe('currentAccount');
  });

  test('Should not add headers if GetStorage is invalid', async () => {
    const { sut, httpClientSpy } = createSut();
    const request: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
      headers: { field: faker.random.words() }
    };

    await sut.request(request);

    expect(httpClientSpy.url).toBe(request.url);
    expect(httpClientSpy.method).toBe(request.method);
    expect(httpClientSpy.headers).toEqual(request.headers);
  });

  test('Should add headers to HttpClient', async () => {
    const { sut, getStorageSpy, httpClientSpy } = createSut();
    getStorageSpy.value = mockAccountModel();
    const request: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['GET', 'POST', 'PUT', 'DELETE'])
    };

    await sut.request(request);

    expect(httpClientSpy.url).toBe(request.url);
    expect(httpClientSpy.method).toBe(request.method);
    expect(httpClientSpy.headers).toEqual({ 'x-access-token': getStorageSpy.value.accessToken });
  });

  test('Should merge headers to HttpClient', async () => {
    const { sut, getStorageSpy, httpClientSpy } = createSut();
    getStorageSpy.value = mockAccountModel();
    const field = faker.random.words();
    const request: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
      headers: { field }
    };

    await sut.request(request);

    expect(httpClientSpy.url).toBe(request.url);
    expect(httpClientSpy.method).toBe(request.method);
    expect(httpClientSpy.headers).toEqual({
      field, 'x-access-token': getStorageSpy.value.accessToken
    });
  });

  test('Should return the same result as HttpClient', async () => {
    const { sut, httpClientSpy } = createSut();
    const response = await sut.request(mockHttpRequest());
    expect(response).toEqual(httpClientSpy.response);
  });
});