import { HttpGetClient, HttpStatusCode } from '@/data/protocols';
import { UnexpectedError } from '@/domain/errors';
import { LoadSurveyList } from '@/domain/usecases';

export namespace RemoteLoadSurveyList {
  export type Model = LoadSurveyList.Model;
}

export class RemoteLoadSurveyList implements LoadSurveyList {

  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
  ) { }

  async load(): Promise<LoadSurveyList.Model[]> {
    const response = await this.httpGetClient.get({ url: this.url });

    switch (response.statusCode) {
      case HttpStatusCode.OK: return response.body;
      case HttpStatusCode.NO_CONTENT: return [];
      default: throw new UnexpectedError();
    }
  }
}