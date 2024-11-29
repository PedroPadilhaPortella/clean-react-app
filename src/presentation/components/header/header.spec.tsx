import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { ApiContext } from '@/presentation/contexts';
import { Header } from '@/presentation/components';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
};

const createSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: () => account
    }}>
      <Router history={history}>
        <Header />
      </Router>
    </ ApiContext.Provider>
  );

  return { history, setCurrentAccountMock };
};

describe('Header Component', () => {
  test('Should call setCurrentAccount with null', () => {
    const { history, setCurrentAccountMock } = createSut();

    fireEvent.click(screen.getByTestId('logout'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });

  test('Should render username on header correctly', () => {
    const account = mockAccountModel();
    createSut(account);

    fireEvent.click(screen.getByTestId('logout'));
    expect(screen.getByTestId('username')).toHaveTextContent(account.name);
  });
});