import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError';
import { UnexpectedError } from '@/domain/errors/UnexpectedError';
import { AccountModel } from '@/domain/models/account.model';
import { mockAccountModel, mockAuthentication } from '@/domain/test/account.mock';
import { AuthenticationParams } from '@/domain/usecases/authentication.types';
import faker from 'faker';
import { HttpStatusCode } from '../../protocols';
import { HttpPostClientSpy } from '../../test';
import { RemoteAuthentication } from './remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
};

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return { sut, httpPostClientSpy };
};

describe('RemoteAuthentication', () => {

  test('Should call HttpPostClient with correct URL', async () => {
    const url = 'http://localhost:5000/api/login';
    const { sut, httpPostClientSpy } = createSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = createSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  test('Should throw InvalidCredentialsError when HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = { statusCode: HttpStatusCode.UNAUTHORIZED };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = { statusCode: HttpStatusCode.BAD_REQUEST };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = { statusCode: HttpStatusCode.NOT_FOUND };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = { statusCode: HttpStatusCode.SERVER_ERROR };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an AccountModel when HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = createSut();
    const mockResponse = mockAccountModel();
    httpPostClientSpy.response = { statusCode: HttpStatusCode.OK, body: mockResponse };
    const response = await sut.auth(mockAuthentication());
    await expect(response).toEqual(mockResponse);
  });
});
