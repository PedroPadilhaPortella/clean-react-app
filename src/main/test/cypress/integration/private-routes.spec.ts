import { testUrlMatch } from '../utils/helpers';

describe('Private Routes', () => {

  it('Should logout when the privateRoute has no token', () => {
    cy.visit('');
    testUrlMatch('/login');
  });

  it('Should logout when surveyResult has no token', () => {
    cy.visit('/surveys/any_id');
    testUrlMatch('/login');
  });
});
