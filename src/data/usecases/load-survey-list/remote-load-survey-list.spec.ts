import faker from 'faker';

import { HttpGetClientSpy } from '@/data/test';
import { RemoteLoadSurveyList } from './remote-load-survey-list';
import { HttpStatusCode } from '@/data/protocols';
import { UnexpectedError } from '@/domain/errors';
import { SurveyModel } from '@/domain/models';

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>
};

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>();
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

  test('Should throw UnexpectedError when HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = createSut();
    httpGetClientSpy.response = { statusCode: HttpStatusCode.FORBIDDEN };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
