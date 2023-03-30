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
  it.skip('should render filters columns', () => {
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

  it.skip('should show 15 games and show more games when "show more" is clicked', () => {
    cy.get(`[data-cy="game-card"]`).should('have.length', 15);
    cy.findByRole('button', { name: /show more/i }).click();
    cy.get(`[data-cy="game-card"]`).should('have.length', 30);
  });

  it('should order by price', () => {
    //**order Asc */
    cy.findByText(/lowest to highest/i).click();
    cy.url().should(
      'contain',
      Cypress.config().baseUrl + '/games?sort=price%3Aasc'
    );
    // --or
    cy.location('href').should('contain', 'sort=price%3Aasc');
    // --
    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.findByText('$0.00').should('exist');
      });
    //**order Desc */
    cy.findByText(/highest to lowest/i).click();
    cy.location('href').should('contain', '/games?sort=price%3Adesc');
    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.findByText(/^\$/) // find text that start with $(dolar) sign
          .invoke('text') // transform to text
          .then(($element) => $element.replace('$', '')) // replace dolar with an empty string, so only statys the number
          .then(parseFloat) // transform to float
          .should('be.gt', 0); // the value must be greater than 0
      });
  });
});
