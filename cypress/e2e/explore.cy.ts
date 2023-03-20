import { cy, Cypress, expect, describe, it } from 'local-cypress';

describe('Explore page', () => {
  it('should', () => {
    cy.visit('/games');
    // -- Headings
    cy.findByRole('heading', { name: /sort by price/i }).should('exist');
    cy.findByRole('heading', { name: /^price/i }).should('exist');
    cy.findByRole('heading', { name: 'Platforms' }).should('exist');
    cy.findByRole('heading', { name: 'Genres' }).should('exist');
  });
});
