import React from 'react';

import { remoteLoadSurveyResultFactory } from '@/main/factories/usecases';
import { SurveyResult } from '@/presentation/pages';
import { useParams } from 'react-router';

export const surveyResultFactory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const remoteLoadSurveyResult = remoteLoadSurveyResultFactory(id);

  return <SurveyResult loadSurveyResult={remoteLoadSurveyResult} />;
};