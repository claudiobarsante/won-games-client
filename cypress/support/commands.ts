/*<reference types="cypress" />*/
import { cy, Cypress, expect, describe, it } from 'local-cypress';
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import '@testing-library/cypress/add-commands';
import 'cypress-plugin-stripe-elements';
Cypress.Commands.add('google', () => cy.visit('https://www.google.com/'));
// -- passa o selector e outros argumentos se necessário ...args
Cypress.Commands.add('getByDataCy', (selector, ...args) => {
  return cy.get(`[data-cy="${selector}"]`, ...args);
});
Cypress.Commands.add('shouldRenderBanner', () => {
  // -- verificar no slider pela classe '.slick-slider' e ver se no primeiro slide tem o jogo'Evenicle'
  // -- depois achar o botão
  cy.get('.slick-slider')
    .first()
    // -- within é qdo vc tem mais de um elemento
    .within(() => {
      cy.findByRole('heading', { name: /Evenicle/i });
      cy.findByRole('link', { name: /Buy now/i });

      cy.get('.slick-dots > :nth-child(2) > button').click();
      cy.wait(500); // -- aguardar 500ms pela transição do slide
      cy.findByRole('heading', { name: /Hellfire/i });

      cy.get('.slick-dots > :nth-child(3) > button').click();
      cy.wait(500);
      // -- aqui no caso tem mais de um heading com Cyberpunk 2077, por isso usando findAllByRole
      cy.findAllByRole('heading', {
        name: /Cyberpunk 2077/i
      });
    });
});

// -- colocando ${name} dentro de aspas, garante que a variável é uma string e assegura qdo a string tem espaço ou nome separado
Cypress.Commands.add('shouldRenderShowcase', ({ name, highlight = false }) => {
  cy.get(`[data-cy="${name}"]`).within(() => {
    cy.findByRole('heading', { name }).should('exist');
    // -- condicional de assert para se existir o component highlight
    //? -- incluir no componente highlight data-cy="highlight"
    cy.getByDataCy('highlight').should(highlight ? 'exist' : 'not.exist');

    // -- dentro do highlight tem q ter um link
    if (highlight) {
      cy.get(`[data-cy="highlight"]`).within(() => {
        cy.findByRole('link').should('have.attr', 'href');
        cy.findByRole('link', { name: /Buy now/i });
      });
    }
    // -- tem que ter 3 cards dentro do showcase -- gt significa grater than 0
    //   cy.get(`[data-cy="game-card"]`).should('have.length.gt', 0);
  });
});

Cypress.Commands.add('getFields', (fields) => {
  fields.map(({ label }) => cy.findByText(label).should('exist'));
});

Cypress.Commands.add('shouldBeGreaterThan', (value) => {
  cy.findByText(/^\$\d+(\.\d{1,2})?/)
    .invoke('text')
    .then(($el) => $el.replace('$', ''))
    .then(parseFloat)
    .should('be.gt', value);
});

Cypress.Commands.add('shouldBeLessThan', (value) => {
  cy.findByText(/^\$\d+(\.\d{1,2})?/)
    .invoke('text')
    .then(($el) => $el.replace('$', ''))
    .then(parseFloat)
    .should('be.lt', value);
});

Cypress.Commands.add('signUp', (user: User) => {
  cy.findByPlaceholderText(/user name/i).type(user.username);
  cy.findByPlaceholderText(/email/i).type(user.email);
  cy.findByPlaceholderText(/^password/i).type(user.password);
  cy.findByPlaceholderText(/confirm password/i).type(user.password);
  cy.findByRole('button', { name: /sign up now/i }).click();
});

Cypress.Commands.add(
  'signIn',
  (email = 'e2e@wongames.com', password = '123456') => {
    cy.findAllByPlaceholderText(/email/i).type(email);
    cy.findAllByPlaceholderText(/password/i).type(password);
    cy.findByRole('button', { name: /sign in now/i }).click();
  }
);

Cypress.Commands.add('addToCartByIndex', (index) => {
  cy.getByDataCy('game-card')
    .eq(index)
    .within(() => {
      cy.findByRole('button', { name: /add to cart/i }).click();
    });
});

Cypress.Commands.add('removeFromCartByIndex', (index) => {
  cy.getByDataCy('game-card')
    .eq(index)
    .within(() => {
      cy.findByRole('button', { name: /remove from cart/i }).click();
    });
});
