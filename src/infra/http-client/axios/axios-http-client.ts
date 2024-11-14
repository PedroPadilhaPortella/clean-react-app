import axios, { AxiosResponse } from 'axios';

import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols';

export class AxiosHttpClient implements HttpPostClient {
  async post(params: HttpPostParams): Promise<HttpResponse<any>> {

    let response: AxiosResponse<any>;

    try {
      response = await axios.post(params.url, params.body);
    } catch (error) {
      response = error.response;
    }

    return { statusCode: response.status, body: response.data };
  }
}