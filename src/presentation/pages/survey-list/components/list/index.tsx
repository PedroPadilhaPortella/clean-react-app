import React from 'react';

import { LoadSurveyList } from '@/domain/usecases';
import { SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components';

import styles from './list.module.scss';

type Props = {
  surveys: LoadSurveyList.Model[]
};

const SurveyListItem: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul data-testid="survey-list" className={styles.surveyListItem}>
      {
        surveys.length
          ? surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
          : <SurveyItemEmpty />
      }
    </ul>
  );
};

export default SurveyListItem;