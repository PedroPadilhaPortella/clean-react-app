import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { Authentication } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { AccountModel } from '@/domain/models';

export namespace RemoteAuthentication {
  export type Model = AccountModel;
}

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAuthentication.Model>
  ) { }

  async auth(params: Authentication.Params): Promise<RemoteAuthentication.Model> {
    const response = await this.httpClient.request({ url: this.url, method: 'POST', body: params });

    switch (response.statusCode) {
      case HttpStatusCode.OK: return response.body;
      case HttpStatusCode.UNAUTHORIZED: throw new InvalidCredentialsError();
      default: throw new UnexpectedError();
    }
  }
}
