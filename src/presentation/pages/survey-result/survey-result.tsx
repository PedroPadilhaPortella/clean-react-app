import React from 'react';
import FlipMove from 'react-flip-move';

import { Calendar, Footer, Header, Loading } from '@/presentation/components';
import styles from './survey-result.module.scss';

const SurveyResult: React.FC = () => {

  return (
    <div className={styles.surveyResult}>
      <Header />
      <div className={styles.content}>
        <hgroup>
          <Calendar date={new Date()} className={styles.calendarWrap} />
          <h2>Qual é seu framework web favorito? Qual é seu framework web favorito? Qual é seu framework web favorito?</h2>
        </hgroup>
        <FlipMove className={styles.answersList}>
          <li>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" />
            <span className={styles.answer}>ReactJS</span>
            <span className={styles.percent}>50%</span>
          </li>
          <li className={styles.active}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" />
            <span className={styles.answer}>ReactJS</span>
            <span className={styles.percent}>50%</span>
          </li>
          <li>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" />
            <span className={styles.answer}>ReactJS</span>
            <span className={styles.percent}>50%</span>
          </li>
        </FlipMove >
        <button>Voltar</button>
        {true && <Loading />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;