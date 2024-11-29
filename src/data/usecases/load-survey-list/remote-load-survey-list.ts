import { HttpGetClient, HttpStatusCode } from '@/data/protocols';
import { UnexpectedError } from '@/domain/errors';
import { LoadSurveyList } from '@/domain/usecases';

export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string
    question: string
    date: string
    didAnswer: boolean
  };
}

export class RemoteLoadSurveyList implements LoadSurveyList {

  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
  ) { }

  async load(): Promise<LoadSurveyList.Model[]> {
    const response = await this.httpGetClient.get({ url: this.url });
    const remoteSurveys = response.body || [];

    switch (response.statusCode) {
      case HttpStatusCode.OK:
        return remoteSurveys.map((survey) => {
          return Object.assign(survey, { date: new Date(survey.date) });
        });
      case HttpStatusCode.NO_CONTENT:
        return [];
      default:
        throw new UnexpectedError();
    }
  }
}