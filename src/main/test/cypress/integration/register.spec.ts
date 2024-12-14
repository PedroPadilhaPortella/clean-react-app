import faker from 'faker';

import { testHttpCallsCount, testLocalStorageItem, testUrlMatch } from '../utils/helpers';
import { mockForbiddenError, mockOk, mockServerError } from '../utils/http.mock';
import { testInputStatus, testMainError } from '../utils/form-helpers';

const fillFormFields = (): void => {
  cy.getByTestId('name').type(faker.random.alphaNumeric(7));
  cy.getByTestId('email').type(faker.internet.email());
  const password = faker.random.alphaNumeric(6);
  cy.getByTestId('password').type(password);
  cy.getByTestId('passwordConfirm').type(password);
  cy.getByTestId('submit').click();
};

describe('Register', () => {

  beforeEach(() => {
    cy.visit('register');
  });

  it('Should open register page with correct initial state', () => {
    testInputStatus('name', 'Campo obrigatório');
    testInputStatus('email', 'Campo obrigatório');
    testInputStatus('password', 'Campo obrigatório');
    testInputStatus('passwordConfirm', 'Campo obrigatório');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should reset state on page load', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    testInputStatus('email');
    cy.getByTestId('login').click();
    cy.getByTestId('register').click();
    testInputStatus('email', 'Campo obrigatório');
  });

  it('Should present error state when form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(3));
    cy.getByTestId('email').type(faker.random.word());
    cy.getByTestId('password').type(faker.random.alphaNumeric(3));
    cy.getByTestId('passwordConfirm').type(faker.random.alphaNumeric(3));

    testInputStatus('name', 'Campo inválido');
    testInputStatus('email', 'Campo inválido');
    testInputStatus('password', 'Campo inválido');
    testInputStatus('passwordConfirm', 'Campo inválido');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state when form is valid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(7));
    cy.getByTestId('email').type(faker.internet.email());
    const password = faker.random.alphaNumeric(6);
    cy.getByTestId('password').type(password);
    cy.getByTestId('passwordConfirm').type(password);

    testInputStatus('name');
    testInputStatus('email');
    testInputStatus('password');
    testInputStatus('passwordConfirm');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present EmailInUseError on 403', () => {
    mockForbiddenError(/signup/, 'POST');

    fillFormFields();

    testMainError('Esse email já está em uso');
    testUrlMatch('/register');
  });

  it('Should present error on default error cases', () => {
    mockServerError(/signup/, 'POST');

    fillFormFields();

    testMainError('Algo de errado aconteceu. Tente novamente em breve.');
    testUrlMatch('/register');
  });

  it('Should present update currentAccount when valid credentials are provided', () => {
    mockOk(/signup/, 'POST', 'fx:account');

    fillFormFields();

    cy.getByTestId('main-error').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');
    testUrlMatch('/');
    testLocalStorageItem('currentAccount');
  });

  it('Should prevent multiple submits', () => {
    mockOk(/signup/, 'POST', 'fx:account');

    cy.getByTestId('name').type(faker.random.alphaNumeric(7));
    cy.getByTestId('email').type(faker.internet.email());
    const password = faker.random.alphaNumeric(6);
    cy.getByTestId('password').type(password);
    cy.getByTestId('passwordConfirm').type(password);
    cy.getByTestId('submit').dblclick();

    cy.wait('@request');
    testHttpCallsCount(1);
  });

  it('Should not call submit when form is invalid', () => {
    mockOk(/signup/, 'POST', 'fx:account');

    cy.getByTestId('name').type(faker.random.alphaNumeric(7));
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}');

    testHttpCallsCount(0);
  });

});