import React from 'react';

import { IconName, Icon, Calendar } from '@/presentation/components';
import { LoadSurveyList } from '@/domain/usecases';

import styles from './item.module.scss';

type Props = {
  survey: LoadSurveyList.Model
};

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown;

  return (
    <li className={styles.surveyItem}>
      <div className={styles.surveyContent}>
        <Icon iconName={iconName} />
        <Calendar date={survey.date} className={styles.calendarWrap} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  );
};

export default SurveyItem;