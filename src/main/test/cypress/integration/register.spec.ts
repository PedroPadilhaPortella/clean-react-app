import faker from 'faker';

import { testHttpCallsCount, testInputStatus, testLocalStorageItem, testMainError, testUrlMatch } from '../support/form-helper';
import { mockEmailInUseError, mockOk, mockUnexpectedError } from '../support/http.mock';

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
    mockEmailInUseError(/signup/);

    fillFormFields();

    testMainError('Esse email já está em uso');
    testUrlMatch('/register');
  });

  it('Should present error on default error cases', () => {
    mockUnexpectedError(/signup/, 'POST');

    fillFormFields();

    testMainError('Algo de errado aconteceu. Tente novamente em breve.');
    testUrlMatch('/register');
  });

  it('Should present error when the API does not return an accessToken', () => {
    mockOk(/signup/, 'POST', { invalidProperty: faker.random.words() });

    fillFormFields();

    testMainError('Algo de errado aconteceu. Tente novamente em breve.');
    testUrlMatch('/register');
  });

  it('Should present save accessToken when valid credentials are provided', () => {
    mockOk(/signup/, 'POST', { accessToken: faker.random.uuid() });

    fillFormFields();

    cy.getByTestId('main-error').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');
    testUrlMatch('/');
    testLocalStorageItem('accessToken');
  });

  it('Should prevent multiple submits', () => {
    mockOk(/signup/, 'POST', { accessToken: faker.random.uuid() });

    cy.getByTestId('name').type(faker.random.alphaNumeric(7));
    cy.getByTestId('email').type(faker.internet.email());
    const password = faker.random.alphaNumeric(6);
    cy.getByTestId('password').type(password);
    cy.getByTestId('passwordConfirm').type(password);
    cy.getByTestId('submit').dblclick();

    testHttpCallsCount(1);
  });

  it('Should not call submit when form is invalid', () => {
    mockOk(/signup/, 'POST', { accessToken: faker.random.uuid() });

    cy.getByTestId('name').type(faker.random.alphaNumeric(7));
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}');

    testHttpCallsCount(0);
  });

});