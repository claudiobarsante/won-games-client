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

  it.skip('should order by price', () => {
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

  it('should filter by price', () => {
    cy.findByText('Free').click();
    cy.location('href').should('contain', '/games?price_lte=0');

    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.findByText('$0.00').should('exist');
      });

    cy.findByText('Under $50').click();
    cy.location('href').should('contain', '/games?price_lte=50');
    cy.get('[data-cy="game-card"]')
      .first()
      .within(() => {
        cy.findByText(/^\$\d+(\.\d{1,2})?/)
          .invoke('text')
          .then(($el) => $el.replace('$', ''))
          .then(parseFloat)
          .should('be.lt', 50);
      });

    cy.findByText('Under $100').click();
    cy.location('href').should('contain', '/games?price_lte=100');
    cy.get('[data-cy="game-card"]')
      .first()
      .within(() => {
        cy.shouldBeLessThan(100);
      });

    cy.findByText('Under $150').click();
    cy.location('href').should('contain', '/games?price_lte=150');
    cy.get('[data-cy="game-card"]')
      .first()
      .within(() => {
        cy.shouldBeLessThan(150);
      });

    cy.findByText('Under $250').click();
    cy.location('href').should('contain', '/games?price_lte=250');
    cy.get('[data-cy="game-card"]')
      .first()
      .within(() => {
        cy.shouldBeLessThan(250);
      });
    cy.findByText('Under $500').click();
    cy.location('href').should('contain', '/games?price_lte=500');
    cy.get('[data-cy="game-card"]')
      .first()
      .within(() => {
        cy.shouldBeLessThan(500);
      });
  });

  it('should filter by platform', () => {
    cy.findByText('Windows').click();
    cy.location('href').should('contain', '/games?platforms=windows');
    cy.findByText('Linux').click();
    cy.location('href').should(
      'contain',
      '/games?platforms=windows&platforms=linux'
    );
    cy.findByText('Mac OS').click();
    cy.location('href').should(
      'contain',
      '/games?platforms=windows&platforms=linux&platforms=mac'
    );
  });

  it('should return empty when no games match', () => {
    // clear url
    cy.visit('/games');

    //? -- group that I know that there isn't any games
    cy.findByText(/free/i).click();
    cy.findByText(/linux/i).click();
    cy.findByText(/sports/i).click();
    //? --------------------------------------------

    cy.getByDataCy('game-card').should('not.exist');
    cy.findByText(/We didn't find any games with this filter/i).should('exist');
  });
});
