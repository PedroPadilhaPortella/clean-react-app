import { RemoteLoadSurveyList } from '@/data/usecases';
import { LoadSurveyList } from '@/domain/usecases';
import { AxiosHttpClient } from '@/infra/http-client';
import { apiUrlFactory } from '@/main/factories/http/api-url.factory';

export const remoteLoadSurveyListFactory = (): LoadSurveyList => {
  const url = apiUrlFactory('/surveys');
  const axiosHttpClient = new AxiosHttpClient();
  return new RemoteLoadSurveyList(url, axiosHttpClient);
};