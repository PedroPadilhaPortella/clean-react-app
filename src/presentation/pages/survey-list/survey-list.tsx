import React, { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { SurveyListItem, surveyListState } from '@/presentation/pages/survey-list/components';
import { Error, Footer, Header } from '@/presentation/components';
import { useErrorHandler } from '@/presentation/hooks';
import { LoadSurveyList } from '@/domain/usecases';

import styles from './survey-list.module.scss';

type Props = {
  loadSurveyList: LoadSurveyList
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useRecoilState(surveyListState);

  const resetSurveyListState = useResetRecoilState(surveyListState);

  const errorHandler = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, error: error.message, reload: false }));
  });

  const reload = (): void => setState((old) => ({ surveys: [], error: '', reload: !old.reload }));

  useEffect(() => resetSurveyListState(), []);

  useEffect(() => {
    (async function () {
      await loadSurveyList.load()
        .then((surveys) => setState(old => ({ ...old, surveys })))
        .catch(errorHandler);
    })();
  }, [state.reload]);

  return (
    <div className={styles.surveyList}>
      <Header />
      <div className={styles.content}>
        <h2>Enquetes</h2>
        {state.error ? <Error error={state.error} reload={reload} /> : <SurveyListItem surveys={state.surveys} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;