import React from 'react';
import { useParams } from 'react-router-dom';

import { remoteLoadSurveyResultFactory } from '@/main/factories/usecases';
import { SurveyResult } from '@/presentation/pages';

export const surveyResultFactory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const remoteLoadSurveyResult = remoteLoadSurveyResultFactory(id);

  return <SurveyResult loadSurveyResult={remoteLoadSurveyResult} />;
};