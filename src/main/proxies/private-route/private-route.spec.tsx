import { createMemoryHistory, MemoryHistory } from 'history';

import { mockAccountModel } from '@/domain/test';
import { PrivateRoute } from '@/main/proxies';
import { renderWithHistory } from '@/presentation/test';

type SutTypes = {
  history: MemoryHistory
};

const createSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  renderWithHistory({ history, Page: PrivateRoute, account });
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