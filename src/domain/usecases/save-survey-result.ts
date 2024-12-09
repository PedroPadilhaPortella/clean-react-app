import { SurveyResultModel } from '@/domain/models';

export namespace SaveSurveyResult {
  export type Params = {
    answer: string
  };

  export type Model = SurveyResultModel;
}

export interface SaveSurveyResult {
  save: (params: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Model>
}