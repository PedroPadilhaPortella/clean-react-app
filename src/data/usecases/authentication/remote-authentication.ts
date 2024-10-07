import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { Authentication, AuthenticationParams } from '@/domain/usecases';
import { HttpPostClient, HttpStatusCode } from '../../protocols';

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) { }

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const response = await this.httpPostClient.post({ url: this.url, body: params });

    switch (response.statusCode) {
      case HttpStatusCode.OK: return response.body;
      case HttpStatusCode.UNAUTHORIZED: throw new InvalidCredentialsError();
      default: throw new UnexpectedError();
    }
  }
}
