import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError';
import { UnexpectedError } from '@/domain/errors/UnexpectedError';
import { AccountModel } from '@/domain/models/account.model';
import { Authentication } from '@/domain/usecases/authentication';
import { AuthenticationParams } from '@/domain/usecases/authentication.types';
import { HttpPostClient } from '../../protocols/http/http-post-client';
import { HttpStatusCode } from '../../protocols/http/http-response.types';

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
