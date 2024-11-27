import React from 'react';

import { remoteLoadSurveyListFactory } from '@/main/factories/usecases';
import { SurveyList } from '@/presentation/pages';

export const surveyListFactory: React.FC = () => {
  const remoteLoadSurveyList = remoteLoadSurveyListFactory();

  return <SurveyList loadSurveyList={remoteLoadSurveyList} />;
};