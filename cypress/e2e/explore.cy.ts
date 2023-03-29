import { cy, Cypress, expect, describe, it, beforeEach } from 'local-cypress';

import {
  genreFields,
  platformFields,
  priceFields,
  sortFields
} from './../../src/utils/filter/fields';

describe('Explore page', () => {
  beforeEach(() => {
    // visitar a página
    cy.visit('/games');
  });
  it('should render filters columns', () => {
    // cy.visit('/games');
    // -- Headings
    cy.findByRole('heading', { name: /sort by price/i }).should('exist');
    cy.findByRole('heading', { name: /^price/i }).should('exist');
    cy.findByRole('heading', { name: 'Platforms' }).should('exist');
    cy.findByRole('heading', { name: 'Genres' }).should('exist');
    // -- Labels using custom command
    cy.getFields(genreFields);
    cy.getFields(platformFields);
    cy.getFields(priceFields);
    cy.getFields(sortFields);
    // genreFields.map(({ label }) => cy.findByText(label).should('exist'));
    // platformFields.map(({ label }) => cy.findByText(label).should('exist'));
    // priceFields.map(({ label }) => cy.findByText(label).should('exist'));
    // sortFields.map(({ label }) => cy.findByText(label).should('exist'));
  });

  it('should show 15 games and show more games when "show more" is clicked', () => {
    cy.get(`[data-cy="game-card"]`).should('have.length', 15);
    cy.findByRole('button', { name: /show more/i }).click();
    cy.get(`[data-cy="game-card"]`).should('have.length', 30);
  });
});
