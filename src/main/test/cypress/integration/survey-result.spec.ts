import faker from 'faker';

import { getLocalStorageItem, setLocalStorageItem, testUrlMatch } from '../utils/helpers';
import { mockForbiddenError, mockOk, mockServerError } from '../utils/http.mock';

describe('SurveyList', () => {

  beforeEach(() => {
    setLocalStorageItem(
      'currentAccount',
      { accessToken: faker.random.uuid(), name: faker.name.findName() }
    );
  });

  it('Should present error on UnexpectedError', () => {
    mockServerError(/surveys/, 'GET');
    cy.visit('/surveys/survey_id');
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.');
  });

  it('Should logout on AccessDeniedError', () => {
    mockForbiddenError(/surveys/, 'GET');
    cy.visit('/surveys/survey_id');
    testUrlMatch('/login');
  });

  it('Should present correct username', () => {
    mockServerError(/surveys/, 'GET');
    cy.visit('/surveys/survey_id');
    const { name } = getLocalStorageItem('currentAccount');
    cy.getByTestId('username').should('contain.text', name);
  });

  it('Should navigate to login on logout button click', () => {
    mockServerError(/surveys/, 'GET');
    cy.visit('/surveys/survey_id');
    cy.getByTestId('logout').click();
    testUrlMatch('/login');
  });

  it('Should reload on button click', () => {
    mockServerError(/surveys/, 'GET');
    cy.visit('/surveys/survey_id');
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.');
    mockOk(/surveys/, 'GET', 'fx:survey-result');
    cy.getByTestId('reload').click();
    cy.getByTestId('question').should('exist');
  });

  it('Should present survey result', () => {
    mockOk(/surveys/, 'GET', 'fx:survey-result');
    cy.visit('/surveys/survey_id');
    cy.getByTestId('question').should('have.text', 'Question 1');
    cy.getByTestId('day').should('have.text', '03');
    cy.getByTestId('month').should('have.text', 'fev');
    cy.getByTestId('year').should('have.text', '2018');

    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer');
      assert.equal(li.find('[data-testid="percent"]').text(), '70%');
      assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image');
    });

    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer_2');
      assert.equal(li.find('[data-testid="percent"]').text(), '30%');
      assert.notExists(li.find('[data-testid="image"]'));
    });
  });

  it('Should go to SurveyList on back button click', () => {
    mockOk(/surveys/, 'GET', 'fx:survey-result');
    cy.visit('');
    cy.visit('/surveys/survey_id');
    cy.getByTestId('back-button').click();
    testUrlMatch('/');
  });
});