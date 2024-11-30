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

  it('Should present survey items', () => {
    mockOk(/surveys/, 'GET', 'fx:survey-list');
    cy.visit('');

    cy.get('li:empty').should('have.length', 4);
    cy.get('li:not(empty)').should('have.length', 2);

    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '03');
      assert.equal(li.find('[data-testid="month"]').text(), 'fev');
      assert.equal(li.find('[data-testid="year"]').text(), '2018');
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1');

      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp);
      });
    });

    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '20');
      assert.equal(li.find('[data-testid="month"]').text(), 'out');
      assert.equal(li.find('[data-testid="year"]').text(), '2020');
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2');

      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbDown);
      });
    });
  });
});