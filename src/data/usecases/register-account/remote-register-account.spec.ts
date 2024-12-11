import faker from 'faker';

import { RemoteRegisterAccount } from '@/data/usecases';
import { HttpClientSpy } from '@/data/test';
import { mockRegisterAccountModel, mockRegisterParams } from '@/domain/test';
import { HttpStatusCode } from '@/data/protocols';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';

type SutTypes = {
  sut: RemoteRegisterAccount
  httpClientSpy: HttpClientSpy<RemoteRegisterAccount.Model>
};

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteRegisterAccount.Model>();
  const sut = new RemoteRegisterAccount(url, httpClientSpy);
  return { sut, httpClientSpy };
};

describe('RemoteRegisterAccount', () => {
  test('Should call HttpClient with correct URL, method and body', async () => {
    const url = 'http://localhost:5000/api/login';
    const registerParams = mockRegisterParams();
    const { sut, httpClientSpy } = createSut(url);
    await sut.register(registerParams);
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('POST');
    expect(httpClientSpy.body).toEqual(registerParams);
  });

  test('Should throw EmailInUseError when HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.FORBIDDEN };
    const promise = sut.register(mockRegisterParams());
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.BAD_REQUEST };
    const promise = sut.register(mockRegisterParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.SERVER_ERROR };
    const promise = sut.register(mockRegisterParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an RegisterAccount.Model when HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = createSut();
    const mockResponse = mockRegisterAccountModel();
    httpClientSpy.response = { statusCode: HttpStatusCode.OK, body: mockResponse };
    const response = await sut.register(mockRegisterParams());
    expect(response).toEqual(mockResponse);
  });
});