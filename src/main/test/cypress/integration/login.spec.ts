import faker from 'faker';

import { testHttpCallsCount, testInputStatus, testLocalStorageItem, testMainError, testUrlMatch } from '../support/form-helper';
import { mockInvalidCredentialError, mockOk, mockUnexpectedError } from '../support/http.mock';

const fillFormFields = (): void => {
  cy.getByTestId('email').type(faker.internet.email());
  cy.getByTestId('password').type(faker.random.alphaNumeric(6));
  cy.getByTestId('submit').click();
};

describe('Login', () => {

  beforeEach(() => {
    cy.visit('login');
  });

  it('Should open login page with correct initial state', () => {
    testInputStatus('email', 'Campo obrigatório');
    testInputStatus('password', 'Campo obrigatório');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state when form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word());
    cy.getByTestId('password').type(faker.random.alphaNumeric(3));

    testInputStatus('email', 'Campo inválido');
    testInputStatus('password', 'Campo inválido');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state when form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.random.alphaNumeric(6));

    testInputStatus('email');
    testInputStatus('password');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error when invalid credentials are provided', () => {
    mockInvalidCredentialError(/login/);

    fillFormFields();

    testMainError('Credenciais inválidas');
    testUrlMatch('/login');
  });

  it('Should present error on default error cases', () => {
    mockUnexpectedError(/login/, 'POST');

    fillFormFields();

    testMainError('Algo de errado aconteceu. Tente novamente em breve.');
    testUrlMatch('/login');
  });

  it('Should present error when the API does not return an accessToken', () => {
    mockOk(/login/, 'POST', { invalidProperty: faker.random.words() });

    fillFormFields();

    testMainError('Algo de errado aconteceu. Tente novamente em breve.');
    testUrlMatch('/login');
  });

  it('Should present save accessToken when valid credentials are provided', () => {
    mockOk(/login/, 'POST', { accessToken: faker.random.uuid() });

    fillFormFields();

    cy.getByTestId('main-error').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');
    testUrlMatch('/');
    testLocalStorageItem('accessToken');
  });

  it('Should prevent multiple submits', () => {
    mockOk(/login/, 'POST', { accessToken: faker.random.uuid() });

    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.random.alphaNumeric(6));
    cy.getByTestId('submit').dblclick();

    testHttpCallsCount(1);
  });

  it('Should not call submit when form is invalid', () => {
    mockOk(/login/, 'POST', { accessToken: faker.random.uuid() });

    cy.getByTestId('email').type(faker.internet.email()).type('{enter}');

    testHttpCallsCount(0);
  });
});