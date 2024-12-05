import faker from 'faker';

import { HttpGetClientSpy, mockRemoteSurveyResultModel } from '@/data/test';
import { RemoteLoadSurveyResult } from './remote-load-survey-result';
import { HttpStatusCode } from '@/data/protocols';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyResult.Model>
};

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyResult.Model>();
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);
  return { sut, httpGetClientSpy };
};

describe('RemoteLoadSurveyList', () => {

  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = createSut(url);
    httpGetClientSpy.response = { statusCode: HttpStatusCode.OK, body: mockRemoteSurveyResultModel() };

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

  test('Should return a SurveyResult when HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = createSut();
    const httpResult = mockRemoteSurveyResultModel();

    httpGetClientSpy.response = { statusCode: HttpStatusCode.OK, body: httpResult };
    const response = await sut.load();

    expect(response).toEqual({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date)
    });
  });

  // test('Should return an empty list when HttpPostClient returns 204', async () => {
  //   const { sut, httpGetClientSpy } = createSut();
  //   httpGetClientSpy.response = { statusCode: HttpStatusCode.NO_CONTENT };
  //   const response = await sut.load();
  //   expect(response).toEqual([]);
  // });
});
