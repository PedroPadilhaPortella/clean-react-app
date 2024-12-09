import { HttpClient } from '@/data/protocols';
import { AxiosHttpClient } from '@/infra/http-client';
import { AuthorizeHttpClientDecorator } from '@/main/decorators';
import { localStorageAdapterFactory } from '@/main/factories/usecases';

export const authorizeHttpClientDecoratorFactory = (): HttpClient => {
  const localStorageAdapter = localStorageAdapterFactory();
  const axiosHttpClient = new AxiosHttpClient();
  return new AuthorizeHttpClientDecorator(localStorageAdapter, axiosHttpClient);
};