import { RegisterAccount } from '@/domain/usecases';
import { HttpPostClient, HttpStatusCode } from '@/data/protocols';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';

export namespace RemoteRegisterAccount {
  export type Model = AccountModel;
}

export class RemoteRegisterAccount implements RegisterAccount {

  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<RemoteRegisterAccount.Model>
  ) { }

  async register(params: RegisterAccount.Params): Promise<RegisterAccount.Model> {
    const response = await this.httpPostClient.post({ url: this.url, body: params });
    switch (response.statusCode) {
      case HttpStatusCode.OK: return response.body;
      case HttpStatusCode.FORBIDDEN: throw new EmailInUseError();
      default: throw new UnexpectedError();
    }
  }
}