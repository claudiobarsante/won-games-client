import { cy, Cypress, expect, describe, it, beforeEach } from 'local-cypress';

describe('Game Page', () => {
  beforeEach(() => {
    // visitar a página
    cy.visit('/game/cyberpunk-2077');
  });
  it('should render page game sections', () => {
    // -- section GameInfo
    cy.get(`[data-cy="game-info"]`).within(() => {
      cy.findAllByRole('heading', { name: 'Cyberpunk 2077' }).should('exist');
      // -- '^' é um seletor que significa começando com...
      cy.findByText(
        /^Cyberpunk 2077 is an open-world, action-adventure story set in Night City/i
      ).should('exist');
      cy.findByText('$133.89').should('exist');
      cy.findByRole('button', { name: 'Add to cart' }).should('exist');
    });

    // -- Gallery
    //<img role="button" src="http://localhost:1337/uploads/cyberpunk_2077_5059ccad6f.jpg" alt="Thumb - null" tabindex="-1" style="width: 100%; display: inline-block;">
    cy.findAllByRole('button', { name: /thumb -/i }).should(
      'have.length.gt',
      0
    );

    // -- Content
    cy.get(`[data-cy="content"]`).within(() => {
      cy.findByRole('heading', { name: 'Description' }).should('exist');
    });
    // -- check for children. In the content section have at least 2 children
    cy.get(`[data-cy="content"]`).children().should('have.length.at.least', 2);

    // -- Game Details
    cy.get(`[data-cy="game-details"]`).within(() => {
      cy.findByRole('heading', { name: 'Game Details' }).should('exist');
      cy.findByRole('heading', { name: /developer/i }).should('exist');
      cy.findByRole('heading', { name: /release date/i }).should('exist');
      cy.findByRole('heading', { name: /platforms/i }).should('exist');
      cy.findByRole('heading', { name: /publisher/i }).should('exist');
      cy.findByRole('heading', { name: /rating/i }).should('exist');
      cy.findByRole('heading', { name: /genres/i }).should('exist');

      cy.findAllByText(/cd projekt red/i).should('have.length', 2);
      cy.findByText(/dec 8, 2020/i).should('exist');
      cy.findByRole('img', { name: /windows/i }).should('exist');
      cy.findByText(/free/i).should('exist');
      cy.findByText('Role-playing / Action / Sci-fi').should('exist');
    });

    // -- Showcase
    cy.shouldRenderShowcase({ name: 'Up coming games', highlight: true });
    cy.shouldRenderShowcase({
      name: 'You may like theses games',
      highlight: false
    });
  });

  it('should add/remove game in cart', () => {
    cy.getByDataCy('game-info').within(() => {
      cy.findByRole('button', { name: /add to cart/i }).click();
      cy.findByRole('button', { name: /remove from cart/i }).should('exist');
    });

    // -- to check if the game was added to the cart
    /**
     * <span aria-label="Cart Items" class="styles__Badge-sc-1ly49us-1 fheCvW">1</span>
     */
    cy.findAllByLabelText(/cart items/i)
      .first()
      .should('have.text', 1) //? -- instead of should, can use .contains('1')
      .click(); //? to open the modal with data-cy="card-list"
    //* -- or cy.get('span[aria-label="Cart Items"]').eq(1).should('have.text', 1);

    cy.get(`[data-cy="cart-list"]`).within(() => {
      cy.findByRole('heading', { name: /cyberpunk 2077/i }).should('exist');
    });

    // -- remove item
    cy.findAllByLabelText(/cart items/i)
      .first()
      .click();
    cy.getByDataCy('game-info').within(() => {
      cy.findByRole('button', { name: /remove from cart/i }).click();
      cy.findByRole('button', { name: /add to cart/i }).should('exist');
    });

    cy.findAllByLabelText(/cart items/i).should('not.exist');
  });
});
