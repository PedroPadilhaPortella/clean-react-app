import faker from 'faker';

const baseUrl: string = Cypress.config().baseUrl;

describe('Login', () => {

  beforeEach(() => {
    cy.server();
    cy.visit('login');
  });

  it('Should open login page with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'title', 'Campo obrigatório');
    cy.getByTestId('email-label').should('have.attr', 'title', 'Campo obrigatório');
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid');

    cy.getByTestId('password').should('have.attr', 'title', 'Campo obrigatório');
    cy.getByTestId('password-label').should('have.attr', 'title', 'Campo obrigatório');
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state when form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word());
    cy.getByTestId('password').type(faker.random.alphaNumeric(3));

    cy.getByTestId('email').should('have.attr', 'title', 'Campo inválido');
    cy.getByTestId('email-label').should('have.attr', 'title', 'Campo inválido');
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid');

    cy.getByTestId('password').should('have.attr', 'title', 'Campo inválido');
    cy.getByTestId('password-label').should('have.attr', 'title', 'Campo inválido');
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state when form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.random.alphaNumeric(6));

    cy.getByTestId('email').should('not.have.attr', 'title');
    cy.getByTestId('email-label').should('not.have.attr', 'title');
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'valid');

    cy.getByTestId('password').should('not.have.attr', 'title');
    cy.getByTestId('password-label').should('not.have.attr', 'title');
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'valid');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error when invalid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 401,
      response: { error: faker.random.words() }
    });

    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.random.alphaNumeric(6)).type('{enter}');
    cy.getByTestId('main-error').should('contain.text', 'Credenciais inválidas');
    cy.getByTestId('spinner').should('not.exist');
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should present error on default error cases', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: faker.helpers.randomize([400, 404, 500]),
      response: { error: faker.random.words() }
    });

    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.random.alphaNumeric(6));
    cy.getByTestId('submit').click();

    cy.getByTestId('main-error')
      .should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.');
    cy.getByTestId('spinner').should('not.exist');
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should present error when the API does not return an accessToken', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: { invalidProperty: faker.random.words() }
    });

    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.random.alphaNumeric(6));
    cy.getByTestId('submit').click();

    cy.getByTestId('main-error')
      .should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.');
    cy.getByTestId('spinner').should('not.exist');
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should present save accessToken when valid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: { accessToken: faker.random.uuid() }
    });

    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.random.alphaNumeric(6));
    cy.getByTestId('submit').click();

    cy.getByTestId('main-error').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');
    cy.url().should('eq', `${baseUrl}/`);
    cy.window().then(window => assert.ok(window.localStorage.getItem('accessToken')));
  });

  it('Should prevent multiple submits', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: { accessToken: faker.random.uuid() }
    }).as('request');

    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.random.alphaNumeric(6));
    cy.getByTestId('submit').dblclick();

    cy.get('@request.all').should('have.length', 1);
  });

  it('Should not call submit when form is invalid', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: { accessToken: faker.random.uuid() }
    }).as('request');

    cy.getByTestId('email').type(faker.internet.email()).type('{enter}');

    cy.get('@request.all').should('have.length', 0);
  });
});