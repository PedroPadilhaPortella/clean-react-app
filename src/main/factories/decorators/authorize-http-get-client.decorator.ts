import { HttpGetClient } from '@/data/protocols';
import { AxiosHttpClient } from '@/infra/http-client';
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';
import { localStorageAdapterFactory } from '@/main/factories/usecases';

export const authorizeHttpGetClientDecoratorFactory = (): HttpGetClient => {
  const localStorageAdapter = localStorageAdapterFactory();
  const axiosHttpClient = new AxiosHttpClient();
  return new AuthorizeHttpGetClientDecorator(localStorageAdapter, axiosHttpClient);
};