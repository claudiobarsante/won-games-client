import { cy, Cypress, describe, it } from 'local-cypress';
import { createUser } from '../support/generate';

describe('User', () => {
  it('should sign up', () => {
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

  it.only('should sign the user and redirect to the page that was previously defined', () => {
    cy.visit('/profile/me');
    // -- redirect to sing-in with the 'profile/me' callback
    cy.location('href').should(
      'eq',
      Cypress.config().baseUrl + '/sign-in?callbackUrl=/profile/me'
    );

    cy.findByPlaceholderText(/email/i).type('e2e@wongames.com');
    cy.findByPlaceholderText(/password/i).type('123456');
    cy.findByRole('button', { name: /sign in now/i }).click();
    // -- redirect to profile/me
    cy.location('href').should('eq', Cypress.config().baseUrl + '/profile/me');
    // -- confirm user
    cy.findByLabelText(/username/i).should('have.value', 'cypress');
    // -- or cy.get('#username').should('have.value', 'cypress');
    cy.findByLabelText(/e-mail/i).should('have.value', 'e2e@wongames.com');
  });
});
