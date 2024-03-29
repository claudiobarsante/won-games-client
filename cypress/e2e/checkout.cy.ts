import { cy, Cypress, describe, it, expect, beforeEach } from 'local-cypress';
import { createUser } from '../support/generate';

describe('Checkout', () => {
  // create a new user on every order to assure that we are testing with the same user
  let user: User;
  describe('Free Games', () => {
    beforeEach(() => {
      user = createUser();
    });

    it.skip('should by free games', () => {
      // create user
      cy.visit('/sign-up');
      cy.signUp(user);
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      // goto explore page
      cy.findByRole('link', { name: /explore/i }).click();
      cy.url().should('eq', `${Cypress.config().baseUrl}/games`);
      // filter free games
      cy.findByText(/free/i).click();
      cy.url().should('contain', 'price_lte=0');
      // add game to cart
      cy.addToCartByIndex(0);
      // check cart and open dropdown
      cy.findAllByLabelText(/cart items/i)
        .first() // -- using first because there're 2 shopping carts, one for desktop and other to mobile
        .should('have.text', 1)
        .click(); // -- open cart
      // click to order
      cy.getByDataCy('cart-list').within(() => {
        cy.findByText(/Buy it now/i).click();
      });
      // check for free games text
      cy.findByText(/Only free games, click buy and enjoy!/i).should('exist');
      // click to buy
      cy.findByRole('button', { name: /buy now/i }).click();
      // redirect to success page
      cy.url().should('eq', `${Cypress.config().baseUrl}/success`);
      // show sucess text
      cy.findByText(/your purchase was successful!/i).should('exist');
    });

    it.skip('should show games in order page', () => {
      cy.visit('/profile/orders');
      cy.location('href').should(
        'eq',
        `${Cypress.config().baseUrl}/sign-in?callbackUrl=/profile/orders`
      );
      // click on orders link
      cy.signIn(user.email, user.password);
      cy.location('href').should(
        'eq',
        `${Cypress.config().baseUrl}/profile/orders`
      );
      // check for game ordered
      cy.getByDataCy('game-item').should('have.length', 1);
    });
  });

  describe('Paid Games', () => {
    beforeEach(() => {
      user = createUser();
    });

    it('should by paid games', () => {
      // create user
      cy.visit('/sign-up');
      cy.signUp(user);
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      // goto explore page
      cy.findByRole('link', { name: /explore/i }).click();
      cy.url().should('eq', `${Cypress.config().baseUrl}/games`);
      // filter paid games
      cy.findByText(/highest to lowest/i).click();
      cy.location('href').should('contain', 'sort=price%3Adesc');
      // add game to cart
      cy.addToCartByIndex(0);
      // check cart and open dropdown
      cy.findAllByLabelText(/cart items/i)
        .first() // -- using first because there're 2 shopping carts, one for desktop and other to mobile
        .should('have.text', 1)
        .click(); // -- open cart
      // click to order
      cy.getByDataCy('cart-list').within(() => {
        cy.findByText(/Buy it now/i).click();
      });
      // buy button should be disabled
      cy.findByRole('button', { name: /buy now/i }).should(
        'have.attr',
        'disabled'
      );
      // fill with credit card number
      cy.fillElementsInput('cardNumber', '4242424242424242');
      cy.fillElementsInput('cardExpiry', '1040');
      cy.fillElementsInput('cardCvc', '103');
      // click to buy
      cy.findByRole('button', { name: /buy now/i }).click();
      // redirect to success page
      cy.url().should('eq', `${Cypress.config().baseUrl}/success`);
      // show sucess text
      cy.findByText(/your purchase was successful!/i).should('exist');
    });

    it('should show games in order page', () => {
      cy.visit('/profile/orders');
      cy.location('href').should(
        'eq',
        `${Cypress.config().baseUrl}/sign-in?callbackUrl=/profile/orders`
      );
      // click on orders link
      cy.signIn(user.email, user.password);
      cy.location('href').should(
        'eq',
        `${Cypress.config().baseUrl}/profile/orders`
      );
      // check for game ordered
      cy.getByDataCy('game-item').should('have.length', 1);
    });
  });
});
