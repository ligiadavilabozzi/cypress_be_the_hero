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


        cy.wait('@postOng').its('response.statusCode').should('eq',200)

    })



        

        

    it('The ong must be able to log into the system',()=>{

    })
})