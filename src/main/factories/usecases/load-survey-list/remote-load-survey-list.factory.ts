import { RemoteLoadSurveyList } from '@/data/usecases';
import { LoadSurveyList } from '@/domain/usecases';
import { authorizeHttpClientDecoratorFactory } from '@/main/factories/decorators';
import { apiUrlFactory } from '@/main/factories/http/api-url.factory';

export const remoteLoadSurveyListFactory = (): LoadSurveyList => {
  const url = apiUrlFactory('/surveys');
  const authorizeHttpClientDecorator = authorizeHttpClientDecoratorFactory();
  return new RemoteLoadSurveyList(url, authorizeHttpClientDecorator);
};