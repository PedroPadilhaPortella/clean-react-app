import { HttpGetClient, HttpGetParams, HttpResponse, GetStorage } from '@/data/protocols';

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {

  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient
  ) { }

  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    const account = this.getStorage.get('currentAccount');

    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(
          params.headers || {},
          { 'x-access-token': account.accessToken }
        )
      });
    }

    return await this.httpGetClient.get(params);
  }
}