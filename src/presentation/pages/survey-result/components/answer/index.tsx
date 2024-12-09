import React from 'react';

import { SurveyResultAnswerModel } from '@/domain/models';

import styles from './answer.module.scss';

type Props = {
  answer: SurveyResultAnswerModel
};

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const activeClassName = answer.isCurrentAccountAnswer ? styles.active : '';

  return (
    <li data-testid="answer-wrap" className={[styles.answerWrap, activeClassName].join(' ')}>
      {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
      <span data-testid="answer" className={styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={styles.percent}>{answer.percent}%</span>
    </li>
  );
};

export default Answer;