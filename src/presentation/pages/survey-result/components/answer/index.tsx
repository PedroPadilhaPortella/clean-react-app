import React from 'react';

import { useRecoilValue } from 'recoil';

import { SurveyResultAnswerModel } from '@/domain/models';
import { onSurveyAnswerState } from '@/presentation/pages/survey-result/components';

import styles from './answer.module.scss';

type Props = {
  answer: SurveyResultAnswerModel
};

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const activeClassName = answer.isCurrentAccountAnswer ? styles.active : '';

  const { onAnswer } = useRecoilValue(onSurveyAnswerState);

  const answerClick = (event: React.MouseEvent): void => {
    if (event.currentTarget.classList.contains(styles.active)) return;
    onAnswer((answer.answer));
  };

  return (
    <li data-testid="answer-wrap" onClick={answerClick} className={[styles.answerWrap, activeClassName].join(' ')}>
      {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
      <span data-testid="answer" className={styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={styles.percent}>{answer.percent}%</span>
    </li>
  );
};

export default Answer;