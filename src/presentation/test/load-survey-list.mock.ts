import { SurveyModel } from '@/domain/models';
import { LoadSurveyList } from '@/domain/usecases';

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;

  async load(): Promise<SurveyModel[]> {
    this.callsCount++;
    return Promise.resolve([]);
  }
}