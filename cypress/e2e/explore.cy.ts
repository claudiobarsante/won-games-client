import { cy, Cypress, expect, describe, it } from 'local-cypress';

import {
  genreFields,
  platformFields,
  priceFields,
  sortFields
} from './../../src/utils/filter/fields';

describe('Explore page', () => {
  it('should', () => {
    cy.visit('/games');
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
});
