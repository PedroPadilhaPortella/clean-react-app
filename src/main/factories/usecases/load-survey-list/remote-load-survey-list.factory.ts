import { RemoteLoadSurveyList } from '@/data/usecases';
import { LoadSurveyList } from '@/domain/usecases';
import { authorizeHttpGetClientDecoratorFactory } from '@/main/factories/decorators';
import { apiUrlFactory } from '@/main/factories/http/api-url.factory';

export const remoteLoadSurveyListFactory = (): LoadSurveyList => {
  const url = apiUrlFactory('/surveys');
  const authorizeHttpGetClientDecorator = authorizeHttpGetClientDecoratorFactory();
  return new RemoteLoadSurveyList(url, authorizeHttpGetClientDecorator);
};