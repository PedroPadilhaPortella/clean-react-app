import { Register, RegisterParams } from '@/domain/usecases';
import { HttpPostClient } from '@/data/protocols';
import { AccountModel } from '@/domain/models';

export class RemoteRegister implements Register {

  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<RegisterParams, AccountModel>
  ) { }

  async register(params: RegisterParams): Promise<AccountModel> {
    await this.httpPostClient.post({ url: this.url, body: params });
    return null;
  }
}