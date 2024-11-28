import React, { useEffect, useState } from 'react';

import { SurveyListItem, Error, SurveyContext } from '@/presentation/pages/survey-list/components';
import { Footer, Header } from '@/presentation/components';
import { LoadSurveyList } from '@/domain/usecases';

import styles from './survey-list.module.scss';

type Props = {
  loadSurveyList: LoadSurveyList
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  });

  useEffect(() => {
    (async function () {
      await loadSurveyList.load()
        .then((surveys) => setState({ ...state, surveys }))
        .catch((error) => setState({ ...state, error: error.message }));
    })();
  }, [state.reload]);

  return (
    <div className={styles.surveyList}>
      <Header />
      <div className={styles.content}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <Error /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;