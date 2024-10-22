import { RemoteAuthentication } from '@/data/usecases';
import { Authentication } from '@/domain/usecases';
import { AxiosHttpClient } from '@/infra/http-client';
import { apiUrlFactory } from '@/main/factories/http/api-url.factory';

export const remoteAuthenticationFactory = (): Authentication => {
  const url = apiUrlFactory('/login');
  const axiosHttpClient = new AxiosHttpClient();
  return new RemoteAuthentication(url, axiosHttpClient);
};