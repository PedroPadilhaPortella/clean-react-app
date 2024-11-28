import React, { useContext } from 'react';

import { LoadSurveyList } from '@/domain/usecases';
import { SurveyContext, SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components';

import styles from './list.module.scss';

const SurveyListItem: React.FC = () => {
  const { state } = useContext(SurveyContext);

  return (
    <ul data-testid="survey-list" className={styles.surveyListItem}>
      {
        state.surveys.length
          ? state.surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
          : <SurveyItemEmpty />
      }
    </ul>
  );
};

export default SurveyListItem;