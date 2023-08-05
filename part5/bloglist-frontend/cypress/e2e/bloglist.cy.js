/* eslint no-undef: 0 */
// describe('template spec', () => {
//     it('passes', () => {
//         cy.visit('https://example.cypress.io')
//     })
// })

describe('Blog app', function() {

    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

        cy.visit('')
    })

    it('Login form is shown', function() {
        cy.contains('login')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username-input').type('mluukkai')
            cy.get('#password-input').type('salainen')
            cy.get('#login-button').click()

            cy.contains('Matti Luukkainen logged-in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username-input').type('mluukkai')
            cy.get('#password-input').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('html').should('not.contain', 'Matti Luukkainen logged-in')
        })
    })
    describe('When logged in', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3003/api/login', {
                username: 'mluukkai', password: 'salainen'
            }).then(response => {
                localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })

        it('A blog can be created and exists', function() {
            cy.contains('new blog').click()
            cy.get('#title-input').type('a blog created by cypress')
            cy.get('#author-input').type('cypress')
            cy.get('#url-input').type('www.cypress.com')
            cy.get('#submit-button').click()
            cy.contains('a blog created by cypress')
            cy.get('.blog')
                .should('contain', 'a blog created by cypress')
                .and('contain', 'cypress')
                .and('contain', 'view')
        })

        describe('and a blog exists', function() {
            beforeEach(function() {
                cy.contains('new blog').click()
                cy.get('#title-input').type('a blog created by cypress')
                cy.get('#author-input').type('cypress')
                cy.get('#url-input').type('www.cypress.com')
                cy.get('#submit-button').click()

                cy.contains('view').click()
            })

            it('the blog can be liked', function() {
                cy.contains('like').click()
                cy.contains('Likes: 1')
            })

            it('the blog can be deleted by the user that created it', function() {
                cy.contains('remove').click()
                cy.get('html').should('not.contain', 'a blog created by cypress')

                // opt. include logout and login with another person who can't delete a blog
                // cy.contains(logout).click()
            })

            it('the blog cannot be deleted by another user', function() {
                cy.contains('logout').click()
                const user = {
                    name: 'Matti 2',
                    username: 'mluukkai2',
                    password: 'salainen'
                }
                cy.request('POST', 'http://localhost:3003/api/users', user)

                cy.request('POST', 'http://localhost:3003/api/login', {
                    username: 'mluukkai2', password: 'salainen'
                }).then(response => {
                    localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
                    cy.visit('http://localhost:3000')
                })

                cy.contains('view').click()
                cy.get('remove').should('not.exist')
            })
        })

        describe.only('and multiple blogs exist', function() {
            beforeEach(function() {
                cy.contains('new blog').click()
                cy.get('#title-input').type('The title with the most likes')
                cy.get('#author-input').type('cypress')
                cy.get('#url-input').type('www.cypress.com')
                cy.get('#submit-button').click()

                cy.contains('new blog').click()
                cy.get('#title-input').type('The title with the second most likes')
                cy.get('#author-input').type('cypress')
                cy.get('#url-input').type('www.cypress.com')
                cy.get('#submit-button').click()
            })

            it('blogs are ordered by likes', function() {
                cy.contains('The title with the most likes')
                    .parent()
                    .contains('view').click()
                    .parent()
                    .contains('like')
                    .click()
                    .click()
                cy.contains('The title with the second most likes')
                    .parent()
                    .contains('view').click()
                    .parent()
                    .contains('like')
                    .click()
                cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
                cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
            })
        })
    })
})