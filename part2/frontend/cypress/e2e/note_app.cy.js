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
        cy.visit('http://localhost:3000')
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
        cy.get('#username').type('test')
        cy.get('#password').type('test')
        cy.get('#login-button').click()

        cy.contains('testName logged-in')
    })
})