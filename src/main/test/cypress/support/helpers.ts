const baseUrl: string = Cypress.config().baseUrl;

export const testHttpCallsCount = (count: number): void => {
  cy.get('@request.all').should('have.length', count);
};

export const testUrlMatch = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`);
};

export const testLocalStorageItem = (key: string): void => {
  cy.window().then(window => assert.ok(window.localStorage.getItem(key)));
};