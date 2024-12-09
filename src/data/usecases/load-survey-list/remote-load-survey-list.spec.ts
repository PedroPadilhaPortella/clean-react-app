import faker from 'faker';

import { HttpClientSpy, mockRemoteSurveyListModel } from '@/data/test';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { RemoteLoadSurveyList } from './remote-load-survey-list';
import { HttpStatusCode } from '@/data/protocols';

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyList.Model[]>
};

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyList.Model[]>();
  const sut = new RemoteLoadSurveyList(url, httpClientSpy);
  return { sut, httpClientSpy };
};

describe('RemoteLoadSurveyList', () => {

  test('Should call HttpClient with correct URL and method', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = createSut(url);
    await sut.load();
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('GET');
  });

  test('Should throw AccessDeniedError when HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.FORBIDDEN };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test('Should throw UnexpectedError when HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.NOT_FOUND };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError when HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.SERVER_ERROR };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return a list of SurveyModels when HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = createSut();
    const httpResult = mockRemoteSurveyListModel();
    httpClientSpy.response = { statusCode: HttpStatusCode.OK, body: httpResult };
    const response = await sut.load();
    expect(response).toEqual(httpResult);
  });

  test('Should return an empty list when HttpClient returns 204', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.NO_CONTENT };
    const response = await sut.load();
    expect(response).toEqual([]);
  });
});
