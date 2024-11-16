import React from 'react';

import styles from './survey-list.module.scss';
import { Footer, Header, Icon, IconName } from '@/presentation/components';

const SurveyList: React.FC = () => {

  return (
    <div className={styles.surveyList}>
      <Header />
      <div className={styles.content}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={styles.surveyContent}>
              <Icon iconName={IconName.thumbDown} />
              <time>
                <span className={styles.day}>16</span>
                <span className={styles.month}>11</span>
                <span className={styles.year}>2024</span>
              </time>
              <p>Qual seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;