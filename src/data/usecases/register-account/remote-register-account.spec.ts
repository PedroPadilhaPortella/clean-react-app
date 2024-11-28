import faker from 'faker';

import { RemoteRegisterAccount } from '@/data/usecases';
import { HttpPostClientSpy } from '@/data/test';
import { mockRegisterAccountModel, mockRegisterParams } from '@/domain/test';
import { HttpStatusCode } from '@/data/protocols';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';

type SutTypes = {
  sut: RemoteRegisterAccount
  httpPostClientSpy: HttpPostClientSpy<RemoteRegisterAccount.Model>
};

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<RemoteRegisterAccount.Model>();
  const sut = new RemoteRegisterAccount(url, httpPostClientSpy);
  return { sut, httpPostClientSpy };
};

describe('RemoteRegisterAccount', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = 'http://localhost:5000/api/login';
    const { sut, httpPostClientSpy } = createSut(url);
    await sut.register(mockRegisterParams());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = createSut();
    const registerParams = mockRegisterParams();
    await sut.register(registerParams);
    expect(httpPostClientSpy.body).toEqual(registerParams);
  });

  test('Should throw EmailInUseError when HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = { statusCode: HttpStatusCode.FORBIDDEN };
    const promise = sut.register(mockRegisterParams());
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = { statusCode: HttpStatusCode.BAD_REQUEST };
    const promise = sut.register(mockRegisterParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = { statusCode: HttpStatusCode.SERVER_ERROR };
    const promise = sut.register(mockRegisterParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an RegisterAccount.Model when HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = createSut();
    const mockResponse = mockRegisterAccountModel();
    httpPostClientSpy.response = { statusCode: HttpStatusCode.OK, body: mockResponse };
    const response = await sut.register(mockRegisterParams());
    expect(response).toEqual(mockResponse);
  });
});