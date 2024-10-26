import faker from 'faker';

import { RegisterParams } from '@/domain/usecases';
import { RemoteRegister } from '@/data/usecases';
import { HttpPostClientSpy } from '@/data/test';
import { AccountModel } from '@/domain/models';
import { mockAccountModel, mockRegister } from '@/domain/test';
import { HttpStatusCode } from '@/data/protocols';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';

type SutTypes = {
  sut: RemoteRegister
  httpPostClientSpy: HttpPostClientSpy<RegisterParams, AccountModel>
};

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<RegisterParams, AccountModel>();
  const sut = new RemoteRegister(url, httpPostClientSpy);
  return { sut, httpPostClientSpy };
};

describe('RemoteRegister', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = 'http://localhost:5000/api/login';
    const { sut, httpPostClientSpy } = createSut(url);
    await sut.register(mockRegister());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = createSut();
    const registerParams = mockRegister();
    await sut.register(registerParams);
    expect(httpPostClientSpy.body).toEqual(registerParams);
  });

  test('Should throw EmailInUseError when HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = { statusCode: HttpStatusCode.FORBIDDEN };
    const promise = sut.register(mockRegister());
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = { statusCode: HttpStatusCode.BAD_REQUEST };
    const promise = sut.register(mockRegister());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = { statusCode: HttpStatusCode.SERVER_ERROR };
    const promise = sut.register(mockRegister());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an AccountModel when HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = createSut();
    const mockResponse = mockAccountModel();
    httpPostClientSpy.response = { statusCode: HttpStatusCode.OK, body: mockResponse };
    const response = await sut.register(mockRegister());
    expect(response).toEqual(mockResponse);
  });
});