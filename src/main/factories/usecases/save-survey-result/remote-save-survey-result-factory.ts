import { RemoteSaveSurveyResult } from '@/data/usecases';
import { SaveSurveyResult } from '@/domain/usecases';
import { authorizeHttpClientDecoratorFactory } from '@/main/factories/decorators';
import { apiUrlFactory } from '@/main/factories/http/api-url.factory';

export const remoteSaveSurveyResultFactory = (id: string): SaveSurveyResult => {
  const url = apiUrlFactory(`/surveys/${id}/results`);
  const authorizeHttpClientDecorator = authorizeHttpClientDecoratorFactory();
  return new RemoteSaveSurveyResult(url, authorizeHttpClientDecorator);
};