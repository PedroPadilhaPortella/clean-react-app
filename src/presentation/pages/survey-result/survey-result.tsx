import React from 'react';
import FlipMove from 'react-flip-move';

import { Footer, Header, Loading } from '@/presentation/components';
import styles from './survey-result.module.scss';

const SurveyResult: React.FC = () => {

  return (
    <div className={styles.surveyResult}>
      <Header />
      <div className={styles.content}>
        <h2>Pergunta da Enquete</h2>
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
        <Loading />
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;