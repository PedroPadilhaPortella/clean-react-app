import faker from 'faker';

import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError';
import { mockAuthenticationModel, mockAuthenticationParams } from '@/domain/test';
import { RemoteAuthentication } from '@/data/usecases';
import { UnexpectedError } from '@/domain/errors';
import { HttpStatusCode } from '@/data/protocols';
import { HttpClientSpy } from '@/data/test';

type SutTypes = {
  sut: RemoteAuthentication
  httpClientSpy: HttpClientSpy<RemoteAuthentication.Model>
};

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAuthentication.Model>();
  const sut = new RemoteAuthentication(url, httpClientSpy);
  return { sut, httpClientSpy };
};

describe('RemoteAuthentication', () => {

  test('Should call HttpClient with correct URL, method and body', async () => {
    const url = 'http://localhost:5000/api/login';
    const authenticationParams = mockAuthenticationParams();
    const { sut, httpClientSpy } = createSut(url);

    await sut.auth(authenticationParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('POST');
    expect(httpClientSpy.body).toEqual(authenticationParams);
  });

  test('Should throw InvalidCredentialsError when HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.UNAUTHORIZED };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.BAD_REQUEST };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.NOT_FOUND };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.SERVER_ERROR };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an Authentication.Model when HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = createSut();
    const mockResponse = mockAuthenticationModel();
    httpClientSpy.response = { statusCode: HttpStatusCode.OK, body: mockResponse };
    const response = await sut.auth(mockAuthenticationParams());
    expect(response).toEqual(mockResponse);
  });
});
