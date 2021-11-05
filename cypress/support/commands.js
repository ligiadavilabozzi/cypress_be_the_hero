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

Cypress.Commands.add('login',() =>{
    cy.visit("http://localhost:3000/profile", {
        onBeforeLoad: (browser) =>{
            browser.localStorage.setItem('ongId', Cypress.env('createdOngId'))
            browser.localStorage.setItem('ongName', Cypress.env('Dogs & Cats Lovers'))
        } //antes da página carregar interaja com browser
    }); 
})