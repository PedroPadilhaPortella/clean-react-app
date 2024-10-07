import { HttpResponse } from './http-response.types';

export type HttpPostParams = {
  url: string
  body?: object
};

export interface HttpPostClient {
  post(params: HttpPostParams): Promise<HttpResponse>
}
