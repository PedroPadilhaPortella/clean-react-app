import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError';
import { UnexpectedError } from '@/domain/errors/unexpectedError';
import { AccountModel } from '@/domain/models/account.model';
import { mockAuthentication } from '@/domain/test/mock-authentication';
import { AuthenticationParams } from '@/domain/usecases/authentication.types';
import faker from 'faker';
import { HttpStatusCode } from '../../protocols/http/http-response.types';
import { HttpPostClientSpy } from '../../test/mock-http-client';
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
});
