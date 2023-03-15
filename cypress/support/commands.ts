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
Cypress.Commands.add('google', () => cy.visit('https://www.google.com/'));
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
  });
});
