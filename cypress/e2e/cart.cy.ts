import { cy, describe, it } from 'local-cypress';

describe('Cart', () => {
  it('should add and remove items from cart', () => {
    // visit Home
    cy.visit('/');

    // -- get first one and add to cart
    cy.getByDataCy('game-card')
      .eq(0) // -- using index
      .within(() => {
        cy.findByRole('button', { name: /add to cart/i }).click();
      });

    // -- get second game and add to cart
    cy.getByDataCy('game-card')
      .eq(1)
      .within(() => {
        cy.findByRole('button', { name: /add to cart/i }).click();
      });

    // -- get third game and add to cart
    cy.getByDataCy('game-card')
      .eq(2)
      .within(() => {
        cy.findByRole('button', { name: /add to cart/i }).click();
      });

    // -- check if the Badge on cart is 3 items
    cy.findAllByLabelText(/cart items/i)
      .first() // -- using first because there're 2 shopping carts, one for desktop and other to mobile
      .should('have.text', 3)
      .click(); // -- open cart

    // -- check if there are 3 items in cart
    cy.getByDataCy('cart-list').within(() => {
      cy.findAllByRole('heading').should('have.length', 3);
    });

    // -- close cart
    cy.findAllByLabelText(/cart items/i)
      .first()
      .click();

    // -- removing first game from cart
    cy.getByDataCy('game-card')
      .eq(0)
      .within(() => {
        cy.findByRole('button', { name: /remove from cart/i }).click();
      });

    // -- removing second game from cart
    cy.getByDataCy('game-card')
      .eq(1)
      .within(() => {
        cy.findByRole('button', { name: /remove from cart/i }).click();
      });

    // -- removing third game from cart
    cy.getByDataCy('game-card')
      .eq(2)
      .within(() => {
        cy.findByRole('button', { name: /remove from cart/i }).click();
      });

    // -- cheack if there's no Badge
    cy.findAllByLabelText(/cart items/i).should('not.exist');

    // -- check if the cart is empty
    cy.findAllByLabelText(/shopping cart/i)
      .first() // -- there're 2 labels one for desktop and other for mobile
      .click();

    cy.getByDataCy('cart-list').within(() => {
      // cy.findAllByRole('heading', { name: /your cart is empty/i, hidden: true }).should('exist')
      cy.findAllByRole('heading', { name: /your cart is empty/i }).should(
        'exist'
      );
    });
  });
});
