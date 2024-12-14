import React, { useEffect } from 'react';

import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { onSurveyAnswerState, Result, surveyResultState } from '@/presentation/pages/survey-result/components';
import { Error, Footer, Header, Loading } from '@/presentation/components';
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases';
import { useErrorHandler } from '@/presentation/hooks';

import styles from './survey-result.module.scss';

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
};

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const [state, setState] = useRecoilState(surveyResultState);

  const resetSurveyResultState = useResetRecoilState(surveyResultState);

  const setOnAnswer = useSetRecoilState(onSurveyAnswerState);

  const errorHandler = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, isLoading: false, error: error.message }));
  });

  const reload = (): void => setState((old) => ({ isLoading: false, surveyResult: null, error: '', reload: !old.reload }));

  const onAnswer = (answer: string): void => {
    if (state.isLoading) return;
    setState((old) => ({ ...old, isLoading: true }));
    saveSurveyResult.save({ answer })
      .then(surveyResult => setState(old => ({ ...old, isLoading: false, surveyResult })))
      .catch(errorHandler);
  };

  useEffect(() => resetSurveyResultState(), []);

  useEffect(() => {
    setOnAnswer({ onAnswer });
  }, []);

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(errorHandler);
  }, [state.reload]);

  return (
    <div className={styles.surveyResult}>
      <Header />
      <div data-testid="survey-result" className={styles.content}>
        {state.surveyResult && <Result surveyResult={state.surveyResult} />}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;