import { HttpResponse } from './http-response.types';

export type HttpPostParams<T> = {
  url: string
  body?: T
};

export interface HttpPostClient<T, R> {
  post: (params: HttpPostParams<T>) => Promise<HttpResponse<R>>
}
