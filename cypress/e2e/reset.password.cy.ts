import { cy, Cypress, describe, it, expect } from 'local-cypress';

describe('Reset password', () => {
  it('should show error if password does not match', () => {
    cy.visit('/reset-password?code=1234567'); // doesn't matter the code. You can put any code

    cy.findAllByPlaceholderText(/^password/i).type('123');
    cy.findAllByPlaceholderText(/confirm password/i).type('321');
    cy.findByRole('button', { name: /reset password/i }).click();

    cy.findByText(/confirm password does not match with password/i).should(
      'exist'
    );
  });

  it('should show error if the code is invalid', () => {
    cy.intercept('POST', '**auth/reset-password', (res) => {
      res.reply({
        statusCode: 400,
        body: {
          error: 'Bad Request',
          message: [
            {
              messages: [
                {
                  message: 'Incorrect code provided.'
                }
              ]
            }
          ]
        }
      });
    });

    cy.visit('/reset-password?code=wrong_code');
    cy.findAllByPlaceholderText(/^password/i).type('12345');
    cy.findAllByPlaceholderText(/confirm password/i).type('12345');
    cy.findByRole('button', { name: /reset password/i }).click();

    cy.findByText(/Incorrect code provided./i).should('exist');
  });

  it.only('should fill the input and redirect to the home page with the user signed in', () => {
    // -- intercept calls

    // -- route Strapi backend
    cy.intercept('POST', '**/auth/reset-password', {
      statusCode: 200,
      body: { user: { email: 'e2e@wongames.com' } }
    });

    // -- route credentials nexth-auth
    cy.intercept('POST', '**/auth/callback/credentials*', {
      statusCode: 200,
      body: { user: { name: 'cypress', email: 'e2e@wongames.com' } }
    });

    // -- route session nexth-auth
    cy.intercept('GET', '**/auth/session*', {
      statusCode: 200,
      body: { user: { name: 'cypress' } }
    });

    // -- user accessing the reset page
    cy.visit('/reset-password?code=valid_token');

    // -- fill password ( with a valid token)
    cy.findAllByPlaceholderText(/^password/i).type('12345');
    cy.findAllByPlaceholderText(/confirm password/i).type('12345');
    cy.findByRole('button', { name: /reset password/i }).click();

    //**sign in happens on the background **

    // -- redirect to home page
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // -- check if the user is signed in(name on menu)
    cy.findByText(/cypress/i).should('exist');
  });
});
