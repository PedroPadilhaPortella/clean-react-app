import { RemoteLoadSurveyResult } from '@/data/usecases';
import { LoadSurveyResult } from '@/domain/usecases';
import { authorizeHttpGetClientDecoratorFactory } from '@/main/factories/decorators';
import { apiUrlFactory } from '@/main/factories/http/api-url.factory';

export const remoteLoadSurveyResultFactory = (id: string): LoadSurveyResult => {
  const url = apiUrlFactory(`/surveys/${id}/results`);
  const authorizeHttpGetClientDecorator = authorizeHttpGetClientDecoratorFactory();
  return new RemoteLoadSurveyResult(url, authorizeHttpGetClientDecorator);
};