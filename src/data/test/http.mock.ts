import faker from 'faker';

import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols';

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
  headers: faker.random.objectElement(),
  body: faker.random.objectElement()
});

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string;
  method?: any;
  body?: any;
  headers?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.OK
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.method = data.method;
    this.headers = data.headers;
    this.body = data.body;
    return Promise.resolve(this.response);
  }
}