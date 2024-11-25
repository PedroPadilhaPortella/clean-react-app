import React from 'react';

import { IconName, Icon } from '@/presentation/components';
import { SurveyModel } from '@/domain/models';

import styles from './item.module.scss';

type Props = {
  survey: SurveyModel
};

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown;

  return (
    <li className={styles.surveyItem}>
      <div className={styles.surveyContent}>
        <Icon iconName={iconName} />
        <time>
          <span data-testid="day" className={styles.day}>
            {survey.date.getDate().toString().padStart(2, '0')}
          </span>
          <span data-testid="month" className={styles.month}>
            {survey.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
          </span>
          <span data-testid="year" className={styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  );
};

export default SurveyItem;