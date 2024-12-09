import faker from 'faker';

import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test';
import { RemoteLoadSurveyResult } from './remote-load-survey-result';
import { HttpStatusCode } from '@/data/protocols';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyResult.Model>
};

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyResult.Model>();
  const sut = new RemoteLoadSurveyResult(url, httpClientSpy);
  return { sut, httpClientSpy };
};

describe('RemoteLoadSurveyList', () => {

  test('Should call HttpClient with correct URL and method', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = createSut(url);
    httpClientSpy.response = { statusCode: HttpStatusCode.OK, body: mockRemoteSurveyResultModel() };

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

  test('Should return a SurveyResult when HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = createSut();
    const httpResult = mockRemoteSurveyResultModel();

    httpClientSpy.response = { statusCode: HttpStatusCode.OK, body: httpResult };
    const response = await sut.load();

    expect(response).toEqual({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date)
    });
  });

  // test('Should return an empty list when HttpPostClient returns 204', async () => {
  //   const { sut, httpClientSpy } = createSut();
  //   httpClientSpy.response = { statusCode: HttpStatusCode.NO_CONTENT };
  //   const response = await sut.load();
  //   expect(response).toEqual([]);
  // });
});
