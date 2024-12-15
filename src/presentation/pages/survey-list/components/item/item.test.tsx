import { fireEvent, screen } from '@testing-library/react';

import { mockSurveyModel } from '@/domain/test';
import { IconName } from '@/presentation/components';
import { SurveyItem } from '@/presentation/pages/survey-list/components';
import { renderWithHistory } from '@/presentation/test';
import { createMemoryHistory, MemoryHistory } from 'history';

type SutTypes = {
  history: MemoryHistory
};

const createSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });

  renderWithHistory({
    history,
    Page: () => SurveyItem({ survey })
  });

  return { history };
};

describe('SurveyItem', () => {
  it('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2020-01-10T00:00:00')
    });

    createSut(survey);

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('month')).toHaveTextContent('jan');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
  });

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2019-05-03T00:00:00')
    });

    createSut(survey);

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('03');
    expect(screen.getByTestId('month')).toHaveTextContent('mai');
    expect(screen.getByTestId('year')).toHaveTextContent('2019');
  });

  test('Should go to SurveyResult', () => {
    const survey = mockSurveyModel();
    const { history } = createSut(survey);

    fireEvent.click(screen.getByTestId('link'));
    expect(history.location.pathname).toBe(`/surveys/${survey.id}`);
  });
});