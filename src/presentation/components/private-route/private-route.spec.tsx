import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { render } from '@testing-library/react';

import PrivateRoute from './private-route';
import { mockAccountModel } from '@/domain/test';
import { ApiContext } from '@/presentation/contexts';

type SutTypes = {
  history: MemoryHistory
};

const createSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </ApiContext.Provider>
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