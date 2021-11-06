const el = require('./elements').ELEMENTS;

class Register {
    accessRegister() {
        cy.visit('http://localhost:3000/register')
    }

    fillRegister() {
        cy.get(el.name).type('Dogs & Cats Lovers')
        cy.get(el.email).type('dogsandcats@gmail.com')
        cy.get(el.whatsapp).type('11999999999')
        cy.get(el.city).type('São Paulo')
        cy.get(el.uf).type('SP')

        cy.intercept('POST', '**/ongs').as('postOng')
        cy.get(el.submit).click()
    }

    validateRegister() {
        cy.wait('@postOng').then((xhr)=> {
            expect(xhr.response.statusCode).to.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    }
}

export default new Register()