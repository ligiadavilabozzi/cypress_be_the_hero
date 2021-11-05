/// <reference types="cypress" /> 

describe('Ongs',()=>{
    it('The Ongs must be able to register.', ()=>{
    
        cy.visit('http://localhost:3000/register')
        cy.get('[data-cy=name]').type('Dogs & Cats Lovers')
        cy.get('[data-cy=email]').type('dogsandcats@gmail.com')
        cy.get('[data-cy=whatsapp]').type('11999999999')
        cy.get('[data-cy=city]').type('São Paulo')
        cy.get('[data-cy=uf]').type('SP')

        cy.intercept('POST', '**/ongs').as('postOng')

        cy.get('[data-cy=submit]').click()

        cy.wait('@postOng')
        .its('response.body')
        .should('have.property', 'id')

    })

    it('The ong must be able to log into the system',()=>{
  
        cy.visit('http://localhost:3000/');
        cy.get('input').type(Cypress.env('createdOngId'))
        cy.get('.button').click()
    })

    it('The ong must be able to disconnected', () =>{
        
        cy.login()
        cy.get('button').click()
    }); 


    it('The ong must be able to register new cases', () =>{
        cy.login() 

        cy.get('.button').click();

        cy.get('[placeholder="Título do caso"]').type('Preciso de ajuda')
        cy.get('textarea').type('Sou um cachorrinho de 2 anos e preciso de ajuda com meus gastos')
        cy.get('[placeholder="Valor em reais"]').type(500)
        
        cy.intercept('POST', '**/incidents').as('newIncident')

        cy.get('.button').click();

        cy.wait('@newIncident').then((xhr)=>{
            expect(xhr.response.statusCode).to.eq(200); 
            expect(xhr.response.body).has.property('id'); 
            expect(xhr.response.body.id).is.not.null;
        })
     
    }); 

    it('The ong must be able to delete a cases', () =>{

        
    }); 

})