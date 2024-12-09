export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
};

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
};

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export enum HttpStatusCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500
}