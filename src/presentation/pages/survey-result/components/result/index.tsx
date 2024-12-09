import React from 'react';
import { useHistory } from 'react-router-dom';
import FlipMove from 'react-flip-move';

import { Answer } from '@/presentation/pages/survey-result/components';
import { Calendar } from '@/presentation/components';
import { LoadSurveyResult } from '@/domain/usecases';

import styles from './result.module.scss';

type Props = {
  surveyResult: LoadSurveyResult.Model
};

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const { goBack } = useHistory();

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid="answers" className={styles.answersList}>
        <>
          {surveyResult.answers.map((answer) => <Answer key={answer.answer} answer={answer} />)}
        </>
      </FlipMove>
      <button className={styles.button} data-testid="back-button" onClick={goBack}>Voltar</button>
    </>
  );
};

export default Result;