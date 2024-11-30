import faker from 'faker';

import { getLocalStorageItem, setLocalStorageItem, testUrlMatch } from '../support/helpers';
import { mockForbiddenError, mockServerError } from '../support/http.mock';

describe('Login', () => {

  beforeEach(() => {
    setLocalStorageItem(
      'currentAccount',
      { accessToken: faker.random.uuid(), name: faker.name.findName() }
    );
  });

  it('Should present error on UnexpectedError', () => {
    mockServerError(/surveys/, 'GET');
    cy.visit('');
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.');
  });

  it('Should logout on AccessDeniedError', () => {
    mockForbiddenError(/surveys/, 'GET');
    cy.visit('');
    testUrlMatch('/login');
  });

  it('Should present correct username', () => {
    mockServerError(/surveys/, 'GET');
    cy.visit('');
    const { name } = getLocalStorageItem('currentAccount');
    cy.getByTestId('username').should('contain.text', name);
  });

  it('Should navigate to login on logout button click', () => {
    mockServerError(/surveys/, 'GET');
    cy.visit('');
    cy.getByTestId('logout').click();
    testUrlMatch('/login');
  });
});