import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { ApiContext } from '@/presentation/contexts';
import { SurveyList } from '@/presentation/pages';
import { UnexpectedError } from '@/domain/errors';
import { LoadSurveyListSpy } from '@/domain/test';

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
};

const createSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(
    <ApiContext.Provider value={{ setCurrentAccount: jest.fn() }}>
      <Router history={createMemoryHistory()}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </ ApiContext.Provider>
  );
  return { loadSurveyListSpy };
};

describe('SurveyList Component', () => {

  test('Should present four empty items on start', async () => {
    createSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
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
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });

  test('Should render error on failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyListSpy, 'load').mockRejectedValueOnce(error);
    createSut(loadSurveyListSpy);

    await waitFor(() => screen.getByRole('heading'));

    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent(error.message);
  });

  test('Should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyListSpy, 'load').mockRejectedValueOnce(error);
    createSut(loadSurveyListSpy);

    await waitFor(() => screen.getByRole('heading'));
    fireEvent.click(screen.getByTestId('reload'));

    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'));
  });
});