import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError';
import { AuthenticationParams } from '@/domain/usecases/authentication.types';
import { HttpPostClient } from '../../protocols/http/http-post-client';
import { HttpStatusCode } from '../../protocols/http/http-response.types';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }

  async auth(params: AuthenticationParams): Promise<void> {
    const response = await this.httpPostClient.post({ url: this.url, body: params });

    switch (response.statusCode) {
      case HttpStatusCode.unathorized: throw new InvalidCredentialsError();
      default: return Promise.resolve();
    }
  }
}
