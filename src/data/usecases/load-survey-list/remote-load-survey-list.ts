import { HttpGetClient, HttpStatusCode } from '@/data/protocols';
import { UnexpectedError } from '@/domain/errors';

export class RemoteLoadSurveyList {

  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) { }

  async load(): Promise<void> {
    const response = await this.httpGetClient.get({ url: this.url });

    switch (response.statusCode) {
      case HttpStatusCode.OK: return response.body;
      case HttpStatusCode.FORBIDDEN: throw new UnexpectedError();
      default: throw new UnexpectedError();
    }
  }

}