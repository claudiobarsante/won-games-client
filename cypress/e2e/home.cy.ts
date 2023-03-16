import { cy, Cypress, expect, describe, it } from 'local-cypress';

describe('Home Page', () => {
  it('should render home sections', () => {
    // visitar a página
    cy.visit('/');

    // -- selecionou os banners
    // -- ver logica no commands.ts, é bom para o caso de você ter o banner em mais de uma página
    // -- ai não precisa repetir o código
    cy.shouldRenderBanner();
    cy.shouldRenderShowcase({ name: 'New Games', highlight: false });
    cy.shouldRenderShowcase({ name: 'Most Popular Games', highlight: true });
    cy.shouldRenderShowcase({ name: 'Up coming games', highlight: false });
    cy.shouldRenderShowcase({ name: 'Free Games', highlight: false });
  });
});

// -- Outra forma sem usar o first()
// cy.get('.slick-slider').each(($div) => {
//   cy.wrap($div).within(() => {
//     cy.findByRole('heading', { name: /Evenicle/i });
//     cy.findByRole('link', { name: /Buy now/i });

//     cy.get('.slick-dots > :nth-child(2) > button').click();
//     cy.wait(500); // -- aguardar 500ms pela transição do slide
//     cy.findByRole('heading', { name: /Hellfire/i });

//     cy.get('.slick-dots > :nth-child(3) > button').click();
//     cy.wait(500);
//     cy.findAllByRole('heading', { name: /Cyberpunk 2077/i });
//   });
// });
