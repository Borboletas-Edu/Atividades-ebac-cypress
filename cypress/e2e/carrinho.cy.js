/// <reference types = 'cypress'/>

describe('Carrinho de itens', () => {

  beforeEach(() => {
  cy.setCookie('ebacStoreVersion', 'v2', { domain: 'lojaebac.ebaconline.art.br' })
  cy.visit('http://lojaebac.ebaconline.art.br')
  });

  afterEach(() => {
    cy.get('[data-testid="remove"]').click()
  });
  
  it('Deve adicionar produtos ao carrinho com sucesso', () => {
    cy.fixture('Usuario').then((dados) => {
      cy.fazerLogin(dados.email, dados.senha)
      cy.AdicionarCarrinho('Tênis')
      cy.get('[data-testid="productName"]').should('contain', 'Tênis')
    });  
  });

  it('Deve verificar se o preço dos itens é igual a soma total do carrinho', () => {
    cy.fixture('Usuario').then((dados) => {
      cy.fazerLogin(dados.email, dados.senha)
      cy.AdicionarCarrinho('tênis')
      cy.get('[style="color: rgb(51, 144, 124); font-size: 16px; margin-right: 10px; font-family: Montserrat-SemiBold;"]')
      .invoke('text').then((valor)=>{
      cy.get('[data-testid="total"]').should('have.text', valor)
      });  
    });
  });

});
