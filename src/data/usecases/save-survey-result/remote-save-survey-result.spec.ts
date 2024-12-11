import faker from 'faker';

import { HttpClientSpy, mockRemoteSurveyResultModel, mockSaveSurveyResultParams } from '@/data/test';
import { RemoteSaveSurveyResult } from './remote-save-survey-result';
import { HttpStatusCode } from '@/data/protocols';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';

type SutTypes = {
  sut: RemoteSaveSurveyResult
  httpClientSpy: HttpClientSpy<RemoteSaveSurveyResult.Model>
};

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteSaveSurveyResult.Model>();
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy);
  return { sut, httpClientSpy };
};

describe('RemoteSaveSurveyList', () => {

  test('Should call HttpClient with correct URL, method and body', async () => {
    const url = faker.internet.url();
    const saveSurveyResultParams = mockSaveSurveyResultParams();
    const { sut, httpClientSpy } = createSut(url);
    httpClientSpy.response = { statusCode: HttpStatusCode.OK, body: mockRemoteSurveyResultModel() };

    await sut.save(saveSurveyResultParams);
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('PUT');
    expect(httpClientSpy.body).toBe(saveSurveyResultParams);
  });

  test('Should throw AccessDeniedError when HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.FORBIDDEN };
    const promise = sut.save(mockSaveSurveyResultParams());
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test('Should throw UnexpectedError when HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.NOT_FOUND };
    const promise = sut.save(mockSaveSurveyResultParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError when HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.SERVER_ERROR };
    const promise = sut.save(mockSaveSurveyResultParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return a SurveyResult when HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = createSut();
    const httpResult = mockRemoteSurveyResultModel();

    httpClientSpy.response = { statusCode: HttpStatusCode.OK, body: httpResult };
    const response = await sut.save(mockSaveSurveyResultParams());

    expect(response).toEqual({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date)
    });
  });
});
