import faker from 'faker';

import { HttpGetClientSpy, mockRemoteSurveyListModel } from '@/data/test';
import { RemoteLoadSurveyList } from './remote-load-survey-list';
import { HttpStatusCode } from '@/data/protocols';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>
};

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>();
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
  return { sut, httpGetClientSpy };
};

describe('RemoteLoadSurveyList', () => {

  test('Should call HttpGetClient with correct URL', async () => {
    const url = 'http://localhost:5000/api/login';
    const { sut, httpGetClientSpy } = createSut(url);
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  });

  test('Should throw AccessDeniedError when HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = createSut();
    httpGetClientSpy.response = { statusCode: HttpStatusCode.FORBIDDEN };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test('Should throw UnexpectedError when HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = createSut();
    httpGetClientSpy.response = { statusCode: HttpStatusCode.NOT_FOUND };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError when HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = createSut();
    httpGetClientSpy.response = { statusCode: HttpStatusCode.SERVER_ERROR };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return a list of SurveyModels when HttpPostClient returns 200', async () => {
    const { sut, httpGetClientSpy } = createSut();
    const httpResult = mockRemoteSurveyListModel();
    httpGetClientSpy.response = { statusCode: HttpStatusCode.OK, body: httpResult };
    const response = await sut.load();
    expect(response).toEqual(httpResult);
  });

  test('Should return an empty list when HttpPostClient returns 204', async () => {
    const { sut, httpGetClientSpy } = createSut();
    httpGetClientSpy.response = { statusCode: HttpStatusCode.NO_CONTENT };
    const response = await sut.load();
    expect(response).toEqual([]);
  });
});
