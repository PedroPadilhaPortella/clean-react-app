import React from 'react';
import { render, screen } from '@testing-library/react';

import { SurveyItem } from '@/presentation/pages/survey-list/components';
import { IconName } from '@/presentation/components';
import { mockSurveyModel } from '@/domain/test';

const createSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />);
};

describe('SurveyItem', () => {
  it('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), { didAnswer: true });
    createSut(survey);

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
  });

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), { didAnswer: false });
    createSut(survey);

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);

  });
});