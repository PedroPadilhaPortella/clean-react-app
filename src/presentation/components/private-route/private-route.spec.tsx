import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { render } from '@testing-library/react';

import PrivateRoute from './private-route';

type SutTypes = {
  history: MemoryHistory
};

const createSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <Router history={history}>
      <PrivateRoute />
    </Router>
  );
  return { history };
};

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    const { history } = createSut();
    expect(history.location.pathname).toBe('/login');
  });
});