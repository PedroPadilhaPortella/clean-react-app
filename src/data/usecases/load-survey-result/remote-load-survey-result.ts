import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { HttpGetClient, HttpStatusCode } from '@/data/protocols';
import { LoadSurveyResult } from '@/domain/usecases';

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string
    date: string
    answers: Array<{
      image?: string
      answer: string
      count: number
      percent: number
      isCurrentAccountAnswer: boolean
    }>
  };
}

export class RemoteLoadSurveyResult implements LoadSurveyResult {

  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Model>
  ) { }

  async load(): Promise<LoadSurveyResult.Model> {
    const response = await this.httpGetClient.get({ url: this.url });
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