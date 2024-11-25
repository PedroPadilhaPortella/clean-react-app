import React, { useEffect, useState } from 'react';

import { Footer, Header, SurveyItem, SurveyItemEmpty } from '@/presentation/components';
import { LoadSurveyList } from '@/domain/usecases';

import styles from './survey-list.module.scss';
import { SurveyModel } from '@/domain/models';

type Props = {
  loadSurveyList: LoadSurveyList
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({ surveys: [] as SurveyModel[], error: '' });

  useEffect(() => {
    (async function () {
      await loadSurveyList.load()
        .then((surveys) => setState({ ...state, surveys }))
        .catch((error) => setState({ ...state, error: error.message }));
    })();
  }, []);

  return (
    <div className={styles.surveyList}>
      <Header />
      <div className={styles.content}>
        <h2>Enquetes</h2>
        {
          state.error
            ? (
              <div>
                <span data-testid="error">{state.error}</span>
                <button>Recarregar</button>
              </div>
            )
            : (
              <ul data-testid="survey-list">
                {
                  state.surveys.length
                    ? state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />) : <SurveyItemEmpty />
                }
              </ul>
            )
        }

      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;