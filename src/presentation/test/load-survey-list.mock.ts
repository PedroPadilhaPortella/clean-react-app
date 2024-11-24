import { SurveyModel } from '@/domain/models';
import { mockSurveyListModel } from '@/domain/test';
import { LoadSurveyList } from '@/domain/usecases';

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyListModel();

  async load(): Promise<SurveyModel[]> {
    this.callsCount++;
    return Promise.resolve(this.surveys);
  }
}