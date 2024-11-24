import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { SurveyList } from '@/presentation/pages';
import { LoadSurveyListSpy } from '@/presentation/test';

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
};

const createSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy();
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />);
  return { loadSurveyListSpy };
};

describe('SurveyList Component', () => {

  test('Should present four empty items on start', async () => {
    createSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
    await waitFor(() => surveyList);
  });

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = createSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'));
  });

  test('Should render SurveyItems on success', async () => {
    createSut();
    const surveyList = screen.getByTestId('survey-list');
    await waitFor(() => surveyList);
    expect(surveyList.querySelectorAll('li.surveyItem')).toHaveLength(3);
  });
});