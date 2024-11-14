import { HttpGetClient, HttpStatusCode } from '@/data/protocols';
import { UnexpectedError } from '@/domain/errors';
import { SurveyModel } from '@/domain/models';
import { LoadSurveyList } from '@/domain/usecases';

export class RemoteLoadSurveyList implements LoadSurveyList {

  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) { }

  async load(): Promise<SurveyModel[]> {
    const response = await this.httpGetClient.get({ url: this.url });

    switch (response.statusCode) {
      case HttpStatusCode.OK: return response.body;
      default: throw new UnexpectedError();
    }
  }
}