import { HttpResponse, GetStorage, HttpClient, HttpRequest } from '@/data/protocols';

export class AuthorizeHttpClientDecorator implements HttpClient {

  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpClient: HttpClient
  ) { }

  async request(data: HttpRequest): Promise<HttpResponse<any>> {
    const account = this.getStorage.get('currentAccount');

    if (account?.accessToken) {
      Object.assign(data, {
        headers: Object.assign(
          data.headers || {},
          { 'x-access-token': account.accessToken }
        )
      });
    }

    return await this.httpClient.request(data);
  }
}