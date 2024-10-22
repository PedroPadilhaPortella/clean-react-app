import { RemoteAuthentication } from '@/data/usecases';
import { Authentication } from '@/domain/usecases';
import { AxiosHttpClient } from '@/infra/http-client';

export const remoteAuthenticationFactory = (): Authentication => {
  const url = 'http://localhost:5000/api/login';
  const axiosHttpClient = new AxiosHttpClient();
  return new RemoteAuthentication(url, axiosHttpClient);
};