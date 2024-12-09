import { SurveyResultModel } from '@/domain/models';

export namespace LoadSurveyResult {
  export type Model = SurveyResultModel;
}

export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResult.Model>
}