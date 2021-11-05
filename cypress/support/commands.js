Cypress.Commands.add("createOng",()=>{
    cy.request({
        method: 'POST',
        url:'http://localhost:3333/ongs',
        body:{
            name:"Dogs & Cats Lovers",
            email:'dogsandcats@gmail.com',
            whatsapp:'11999999999',
            city:"São Paulo", 
            uf:"SP"
        }
    }).then(response=>{
        expect(response.body.id).has.is.not.null;
 
        Cypress.env('createdOngId', response.body.id)
    });
})

Cypress.Commands.add("createNewIncident",()=>{
    cy.request({
        method: 'POST',
        url:'http://localhost:3333/incidents',
        headers:{'Authorization': `${Cypress.env('createdOngId')}`,},
        body:{
            title:"Preciso de AJuda",
            description:'Sou um cachorrinho de 2 anos e preciso de ajuda com meus gastos',
            value:500
        }
    }).then(response=>{
        expect(response.body.id).is.not.null;
        cy.log(response.body.id)

        Cypress.env('createIncidentId', response.body.id)

    });
})

Cypress.Commands.add('login',() =>{
    cy.visit("http://localhost:3000/profile", {
        onBeforeLoad: (browser) =>{
            browser.localStorage.setItem('ongId', Cypress.env('createdOngId'))
            browser.localStorage.setItem('ongName', Cypress.env('Dogs & Cats Lovers'))
        } //antes da página carregar interaja com browser
    }); 
})