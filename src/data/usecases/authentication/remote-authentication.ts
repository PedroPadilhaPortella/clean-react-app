import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError';
import { UnexpectedError } from '@/domain/errors/unexpectedError';
import { AuthenticationParams } from '@/domain/usecases/authentication.types';
import { HttpPostClient } from '../../protocols/http/http-post-client';
import { HttpStatusCode } from '../../protocols/http/http-response.types';
import { AccountModel } from '@/domain/models/account.model';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) { }

  async auth(params: AuthenticationParams): Promise<void> {
    const response = await this.httpPostClient.post({ url: this.url, body: params });

    switch (response.statusCode) {
      case HttpStatusCode.OK: break;
      case HttpStatusCode.UNAUTHORIZED: throw new InvalidCredentialsError();
      default: throw new UnexpectedError();
    }
  }
}
