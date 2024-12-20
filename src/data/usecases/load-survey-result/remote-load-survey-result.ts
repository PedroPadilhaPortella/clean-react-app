import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { RemoteSurveyResultModel } from '@/data/models';
import { LoadSurveyResult } from '@/domain/usecases';

export namespace RemoteLoadSurveyResult {
  export type Model = RemoteSurveyResultModel;
}

export class RemoteLoadSurveyResult implements LoadSurveyResult {

  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadSurveyResult.Model>
  ) { }

  async load(): Promise<LoadSurveyResult.Model> {
    const response = await this.httpClient.request({ url: this.url, method: 'GET' });
    const surveyResult = response.body;

    switch (response.statusCode) {
      case HttpStatusCode.OK:
        return Object.assign({}, surveyResult, { date: new Date(surveyResult.date) });
      case HttpStatusCode.FORBIDDEN:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}