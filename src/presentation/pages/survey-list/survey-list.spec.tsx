import { render, screen } from '@testing-library/react';
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

  test('Should present four empty items on start', () => {
    createSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
  });

  test('Should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = createSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
});