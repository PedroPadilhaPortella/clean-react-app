import React, { useContext } from 'react';

import { SurveyContext, SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components';
import { SurveyModel } from '@/domain/models';

import styles from './list.module.scss';

const SurveyListItem: React.FC = () => {
  const { state } = useContext(SurveyContext);

  return (
    <ul data-testid="survey-list" className={styles.surveyListItem}>
      {
        state.surveys.length
          ? state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />)
          : <SurveyItemEmpty />
      }
    </ul>
  );
};

export default SurveyListItem;