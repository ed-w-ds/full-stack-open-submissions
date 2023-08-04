/* eslint-line-break-style: ["error", "unix"]*/
// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

// cypress uses mocha under the hood
// function is used instead of arrow function because mocha recommends it
// since using arrow function can cause certain issues

describe('Note app', function() {
    beforeEach(function() {
        // cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        //cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        // cy.visit('http://localhost:3000') can be replaced with the following
        // after adding the baseURL to cypress.config.js
        cy.visit('')
    })

    it('front page can be opened', function() {
        cy.contains('Notes')
        cy.contains('Notes Application Footer')
    })

    it('login form can be opened', function() {
        cy.contains('login').click()
    })

    // cy.get allows for searching elements by CSS selectors
    // cy.type allows for typing text into the element
    it('user can login', function() {
        cy.contains('login').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()

        cy.contains('Matti Luukkainen logged-in')
    })

    it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.error')
            .should('contain', 'Wrong credentials')
            // if it is the same CSS class, you can use .and() to chain assertions
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'Matti Luukkainen logged-in')
        // same could be acheived with:
        // cy.contains('Matti Luukkainen logged in').should('not.exist')
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'mluukkai', password: 'salainen' })
        })
        // the function below is in the support folder
        // beforeEach(function() {
        //     cy.request('POST', 'http://localhost:3001/api/login', {
        //         username: 'mluukkai', password: 'salainen'
        //     }).then(response => {
        //         localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        //         cy.visit('http://localhost:3000')
        //     })
        // })
        // same as above but the above only logs in once and retains the token
        // beforeEach(function() {
        //     cy.contains('login').click()
        //     cy.get('#username').type('mluukkai')
        //     cy.get('#password').type('salainen')
        //     cy.get('#login-button').click()
        // })

        it('a new note can be created', function() {
            cy.get('#newNote').click()
            cy.get('#noteInput').type('a note created by cypress')
            cy.contains('save').click()
            cy.contains('a note created by cypress')
        })
        describe('and a note exists', function () {
            // using the helper function
            beforeEach(function () {
                cy.createNote({
                    content: 'another note cypress',
                    important: true
                })
            })
            // same as above but without the helper function
            // beforeEach(function () {
            //     cy.contains('new note').click()
            //     cy.get('input').type('another note cypress')
            //     cy.contains('save').click()
            // })

            it('it can be made not important', function () {
                cy.contains('another note cypress')
                    .contains('make not important')
                    .click()

                cy.contains('another note cypress')
                    .contains('make important')
            })
        })
    })

})
