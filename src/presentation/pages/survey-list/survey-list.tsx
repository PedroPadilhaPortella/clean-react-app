import React, { useEffect } from 'react';

import { Footer, Header, SurveyItemEmpty } from '@/presentation/components';
import { LoadSurveyList } from '@/domain/usecases';

import styles from './survey-list.module.scss';

type Props = {
  loadSurveyList: LoadSurveyList
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {

  useEffect(() => {
    (async function () {
      await loadSurveyList.load();
    })();
  }, []);

  return (
    <div className={styles.surveyList}>
      <Header />
      <div className={styles.content}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;