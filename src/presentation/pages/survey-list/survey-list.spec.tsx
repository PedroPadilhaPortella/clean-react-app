import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { ApiContext } from '@/presentation/contexts';
import { SurveyList } from '@/presentation/pages';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { LoadSurveyListSpy, mockAccountModel } from '@/domain/test';
import { AccountModel } from '@/domain/models';

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
};

const createSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const setCurrentAccountMock = jest.fn();

  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: () => mockAccountModel()
    }}>
      <Router history={history}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </ ApiContext.Provider>
  );
  return { loadSurveyListSpy, history, setCurrentAccountMock };
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

  test('Should render error on UnexpectedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyListSpy, 'load').mockRejectedValueOnce(error);
    createSut(loadSurveyListSpy);

    await waitFor(() => screen.getByRole('heading'));

    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent(error.message);
  });

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest.spyOn(loadSurveyListSpy, 'load').mockRejectedValueOnce(new AccessDeniedError());
    const { setCurrentAccountMock, history } = createSut(loadSurveyListSpy);

    await waitFor(() => screen.getByRole('heading'));

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });

  test('Should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest.spyOn(loadSurveyListSpy, 'load').mockRejectedValueOnce(new UnexpectedError());
    createSut(loadSurveyListSpy);

    await waitFor(() => screen.getByRole('heading'));
    fireEvent.click(screen.getByTestId('reload'));

    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'));
  });
});