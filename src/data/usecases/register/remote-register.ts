import { Register, RegisterParams } from '@/domain/usecases';
import { HttpPostClient, HttpStatusCode } from '@/data/protocols';
import { AccountModel } from '@/domain/models';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';

export class RemoteRegister implements Register {

  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<RegisterParams, AccountModel>
  ) { }

  async register(params: RegisterParams): Promise<AccountModel> {
    const response = await this.httpPostClient.post({ url: this.url, body: params });
    switch (response.statusCode) {
      case HttpStatusCode.OK: return response.body;
      case HttpStatusCode.FORBIDDEN: throw new EmailInUseError();
      default: throw new UnexpectedError();
    }
  }
}