import { cy, Cypress, expect, describe, it } from 'local-cypress';
import { createUser } from '../support/generate';

describe('User', () => {
  it.skip('should sign up', () => {
    const user = createUser();

    cy.visit('/sign-up');

    cy.findByPlaceholderText(/user name/i).type(user.username);
    cy.findByPlaceholderText(/email/i).type(user.email);
    cy.findByPlaceholderText(/^password/i).type(user.password);
    cy.findByPlaceholderText(/confirm password/i).type(user.password);
    cy.findByRole('button', { name: /sign up now/i }).click();

    // -- check after signup if was redirected to the home page
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.findByText(user.username).should('exist');
  });

  it('should sign in and sign out', () => {
    cy.visit('/sign-in');
    cy.url().should('contain', Cypress.config().baseUrl + '/sign-in');

    cy.findAllByPlaceholderText(/email/i).type('e2e@wongames.com');
    cy.findAllByPlaceholderText(/password/i).type('123456');
    cy.findByRole('button', { name: /sign in now/i }).click();

    // -- to show the dropdown
    cy.findByText(/cypress/i)
      .should('exist')
      .click();
    cy.findByRole('button', { name: /sign out/i }).click();

    cy.findByRole('link', { name: /sign in/i }).should('exist');
    cy.findByText(/cypress/i).should('not.exist');
  });
});
