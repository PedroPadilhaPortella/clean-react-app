import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { RemoteSurveyResultModel } from '@/data/models';
import { SaveSurveyResult } from '@/domain/usecases';

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel;
}

export class RemoteSaveSurveyResult implements SaveSurveyResult {

  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) { }

  async save(params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    const response = await this.httpClient.request({ url: this.url, method: 'PUT', body: params });
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