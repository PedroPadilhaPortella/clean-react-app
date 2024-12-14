import React from 'react';

import { createMemoryHistory, MemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { currentAccountState, PrivateRoute } from '@/presentation/components';
import { mockAccountModel } from '@/domain/test';

type SutTypes = {
  history: MemoryHistory
};

const createSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const mockedState = { setCurrentAccount: jest.fn(), getCurrentAccount: () => account };

  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </RecoilRoot>
  );
  return { history };
};

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    const { history } = createSut(null);
    expect(history.location.pathname).toBe('/login');
  });

  test('Should render current component if token is not empty', () => {
    const { history } = createSut();
    expect(history.location.pathname).toBe('/');
  });
});