import { RemoteLoadSurveyResult } from '@/data/usecases';
import { LoadSurveyResult } from '@/domain/usecases';
import { authorizeHttpClientDecoratorFactory } from '@/main/factories/decorators';
import { apiUrlFactory } from '@/main/factories/http/api-url.factory';

export const remoteLoadSurveyResultFactory = (id: string): LoadSurveyResult => {
  const url = apiUrlFactory(`/surveys/${id}/results`);
  const authorizeHttpClientDecorator = authorizeHttpClientDecoratorFactory();
  return new RemoteLoadSurveyResult(url, authorizeHttpClientDecorator);
};