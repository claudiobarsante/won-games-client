import { cy, Cypress, describe, it, expect } from 'local-cypress';

describe('Forgot password', () => {
  it('should fill the input and receive a success message', () => {
    //? -- using '**' means anything before the /auth/forgot-password
    //* -- first, intercept any request
    //* -- second, response with success
    cy.intercept('POST', '**/auth/forgot-password', (res) => {
      res.reply({
        status: 200,
        body: { ok: true }
      });
      expect(res.body.email).to.equal('test@test.com');
    });
    cy.visit('/forgot-password');
    cy.findByPlaceholderText(/email/i).type('test@test.com');
    cy.findByRole('button', { name: /Send email/i }).click();
    // -- success
    cy.findByText('You just received an email!').should('exist');
  });

  it('should fill the input with an invalid email and receive an error', () => {
    // interceptar a chamada
    // retornar um erro
    cy.intercept('POST', '**/auth/forgot-password', (res) => {
      res.reply({
        statusCode: 400,
        body: {
          error: 'Bad Request',
          message: [
            {
              messages: [
                {
                  message: 'This email does not exist'
                }
              ]
            }
          ]
        }
      });
    });

    cy.visit('/forgot-password');

    cy.findAllByPlaceholderText(/email/i).type('ci@wongames.com');
    cy.findByRole('button', { name: /send email/i }).click();

    // eu espero receber a mensagem de sucesso
    cy.findByText(/This email does not exist/i).should('exist');
  });
});
