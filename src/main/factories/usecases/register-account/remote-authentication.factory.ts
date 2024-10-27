import { RemoteRegisterAccount } from '@/data/usecases';
import { RegisterAccount } from '@/domain/usecases';
import { AxiosHttpClient } from '@/infra/http-client';
import { apiUrlFactory } from '@/main/factories/http/api-url.factory';

export const remoteRegisterAccountFactory = (): RegisterAccount => {
  const url = apiUrlFactory('/signup');
  const axiosHttpClient = new AxiosHttpClient();
  return new RemoteRegisterAccount(url, axiosHttpClient);
};