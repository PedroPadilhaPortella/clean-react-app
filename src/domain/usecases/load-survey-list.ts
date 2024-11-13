import { SurveyModel } from '../models';

export interface LoadSurveyList {
  load: () => Promise<SurveyModel>
}