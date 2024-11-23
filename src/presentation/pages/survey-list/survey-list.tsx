import React from 'react';

import styles from './survey-list.module.scss';
import { Footer, Header, SurveyItemEmpty } from '@/presentation/components';

const SurveyList: React.FC = () => {

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