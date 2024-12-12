import React, { useEffect, useState } from 'react';

import { Error, Footer, Header, Loading } from '@/presentation/components';
import { Result, SurveyResultContext } from '@/presentation/pages/survey-result/components';
import { useErrorHandler } from '@/presentation/hooks';
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases';

import styles from './survey-result.module.scss';

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
};

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const [state, setState] = useState({
    surveyResult: null as LoadSurveyResult.Model,
    isLoading: false,
    error: '',
    reload: false
  });

  const onAnswer = (answer: string): void => {
    setState((old) => ({ ...old, isLoading: true }));
    saveSurveyResult.save({ answer })
      .then()
      .catch();
  };

  const errorHandler = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, error: error.message }));
  });

  const reload = (): void => setState((old) => ({ isLoading: false, surveyResult: null, error: '', reload: !old.reload }));

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(errorHandler);
  }, [state.reload]);

  return (
    <div className={styles.surveyResult}>
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <div data-testid="survey-result" className={styles.content}>
          {state.surveyResult && <Result surveyResult={state.surveyResult} />}
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={reload} />}
        </div>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  );
};

export default SurveyResult;