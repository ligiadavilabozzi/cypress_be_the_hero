const el = require('./elements').ELEMENTS;

class NewIncident {
    registerNewIncident() {
        cy.get(el.newIncident).click();
    }

    fillNewIncident() {
        cy.get(el.title).type('Preciso de ajuda')
        cy.get(el.description).type('Sou um cachorrinho de 2 anos e preciso de ajuda com meus gastos')
        cy.get(el.value).type(500)

        cy.intercept('POST', '**/incidents').as('newIncident')
        cy.get(el.buttonRegisterIncident).click();
        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.response.statusCode).to.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    }
}

export default new NewIncident()