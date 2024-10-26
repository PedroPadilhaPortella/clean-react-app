import { RegisterAccount, RegisterAccountParams } from '@/domain/usecases';
import { HttpPostClient, HttpStatusCode } from '@/data/protocols';
import { AccountModel } from '@/domain/models';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';

export class RemoteRegisterAccount implements RegisterAccount {

  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<RegisterAccountParams, AccountModel>
  ) { }

  async register(params: RegisterAccountParams): Promise<AccountModel> {
    const response = await this.httpPostClient.post({ url: this.url, body: params });
    switch (response.statusCode) {
      case HttpStatusCode.OK: return response.body;
      case HttpStatusCode.FORBIDDEN: throw new EmailInUseError();
      default: throw new UnexpectedError();
    }
  }
}