import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`

export const ALL_BOOKS = gql`
    query allBooks($genre: String = null) {
        allBooks(genre: $genre) {
            title
            author {
                name
                bookCount
            }
            published
            genres
        }
    }
`

export const BOOK_BY_GENRE = gql`
    query allBooks($genre: String!) {
        allBooks(genre: $genre) {
            title
            author {
                name
                bookCount
            }
            published
            genres
        }
    }
`

export const ADD_BOOK = gql`
    mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres) {
            title
            published
            genres
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`