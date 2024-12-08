import React, { useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';

import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components';
import styles from './survey-result.module.scss';
import { LoadSurveyResult } from '@/domain/usecases';
import { useErrorHandler } from '@/presentation/hooks';

type Props = {
  loadSurveyResult: LoadSurveyResult
};

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  });

  const errorHandler = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, error: error.message }));
  });

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(errorHandler);
  }, []);

  return (
    <div className={styles.surveyResult}>
      <Header />
      <div data-testid="survey-result" className={styles.content}>
        {state.surveyResult &&
          <>
            <hgroup>
              <Calendar date={state.surveyResult.date} className={styles.calendarWrap} />
              <h2 data-testid="question">{state.surveyResult.question}</h2>
            </hgroup>
            <FlipMove data-testid="answers" className={styles.answersList}>
              {state.surveyResult.answers.map((answer) =>
                <li data-testid="answer-wrap" key={answer.answer} className={answer.isCurrentAccountAnswer ? styles.active : ''}>
                  {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
                  <span data-testid="answer" className={styles.answer}>{answer.answer}</span>
                  <span data-testid="percent" className={styles.percent}>{answer.percent}%</span>
                </li>
              )}
            </FlipMove>
            <button>Voltar</button>
          </>
        }
      </div>
      {state.isLoading && <Loading />}
      {state.error && <Error error={state.error} reload={() => ({})} />}
      <Footer />
    </div>
  );
};

export default SurveyResult;