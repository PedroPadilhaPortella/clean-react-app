import { testUrlMatch } from '../utils/helpers';

describe('Private Routes', () => {

  it('Should logout when the privateRoute has no token', () => {
    cy.visit('');
    testUrlMatch('/login');
  });
});
