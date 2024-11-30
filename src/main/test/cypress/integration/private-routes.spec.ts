import { testUrlMatch } from '../support/helpers';

describe('Private Routes', () => {

  it('Should logout when surveyList has no token', () => {
    cy.visit('');
    testUrlMatch('/login');
  });
});
