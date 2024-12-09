import axios, { AxiosResponse } from 'axios';

import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols';

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse<any>> {

    let response: AxiosResponse<any>;

    try {
      response = await axios.request({
        url: data.url,
        method: data.method,
        headers: data.headers,
        data: data.body
      });
    } catch (error) {
      response = error.response;
    }

    return { statusCode: response.status, body: response.data };
  }
}