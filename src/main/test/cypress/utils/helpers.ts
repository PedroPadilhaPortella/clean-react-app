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

export const setLocalStorageItem = (key: string, value: object): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageItem = (key: string): any => {
  return JSON.parse(localStorage.getItem(key));
};