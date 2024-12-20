import faker from 'faker';

import { LoadSurveyList } from '../usecases';

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.random.uuid(),
  question: faker.random.word(),
  didAnswer: faker.random.boolean(),
  date: faker.date.recent()
});

export const mockSurveyListModel = (): LoadSurveyList.Model[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
]);

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyListModel();

  async load(): Promise<LoadSurveyList.Model[]> {
    this.callsCount++;
    return Promise.resolve(this.surveys);
  }
}