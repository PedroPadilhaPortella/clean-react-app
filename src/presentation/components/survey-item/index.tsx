import React from 'react';

import { IconName, Icon } from '@/presentation/components';

import styles from './survey-item.module.scss';

const SurveyItem: React.FC = () => {
  return (
    <li className={styles.surveyItem}>
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
  );
};

export default SurveyItem;