const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

// const books = Book.find({})
// const authors = Author.find({})

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
    type Book {
        title: String!
        author: Author!
        published: Int!
        id: ID!
        genres: [String!]!
    }

    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int!
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String ): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        AddAuthor(
            name: String!
            born: Int
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
  Query: {
    // count how many books are in the database
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
        const books = await Book.find({}).populate('author')
        if (!args.author && !args.genre) {
          return books
        }
        else if (!args.author) {
            const byGenre = (book) =>
                book.genres.includes(args.genre)
            return books.filter(byGenre)
        }
        else if (!args.genre) {
            const byAuthor = (book) =>
                args.author === book.author.name
            return books.filter(byAuthor)
        }
        else {
          const byAuthorAndGenre = (book) =>
            args.author === book.author.name && book.genres.includes(args.genre)
          return books.filter(byAuthorAndGenre)
        }
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
        console.log('context', context.currentUser)
        return context.currentUser
    }
  },
  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
    bookCount: async (root) => {
        const books = await Book.find({}).populate('author')
        console.log('books', books)
        console.log('books[0].author.name', books[0].author.name)
        console.log('root', root)
        // console.log('root.author.name', root.author.name)
        return books.filter(b => b.author.name === root.name).length
    },
  },
    Mutation: {
        addBook: async (root, args, context) => {
          // finds all documents in the collection ( this time authors )
          // const authors = await Author.find({})
          // finds the author with the name given in the args
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
            try {
                let author = await Author.findOne({ name: args.author })
                console.log('author in addBook', author)
                if (!author) {
                    // const author = { name: args.author, id: uuid() }
                    // authors = authors.concat(author)
                    author = new Author({ name: args.author })
                    await author.save()
                }
                const bookFound = await Book.findOne({ title: args.title })
                console.log('bookFound', bookFound)
                if (bookFound) {
                    throw new GraphQLError('Title must be unique', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.title
                        }
                    })
                }
                if (args.title.length < 5) {
                    throw new GraphQLError('Title must be at least 5 characters long', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.title
                        }
                    })
                }
                console.log('args in addBook', args)
                console.log('author in addBook', author)
                console.log('author._id in addBook', author._id)
                const book = new Book({ ...args, author: author._id })
                return await book.save()
            }
            catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title,
                        error
                    }
                })
            }
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            console.log('currentUser', currentUser)
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
            const author = await Author.findOne( { name: args.name } )
            console.log('author in editAuthor', author)
            if (!author) {
                throw new GraphQLError('Author not found', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name
                    }
                })
            }
            // const updatedAuthor = { ...author, born: args.setBornTo } 
            const updatedAuthor = await Author.findOneAndUpdate(
                { name: args.name },
                { born: args.setBornTo },
                { new: true } 
            )
            console.log('updatedAuthor', updatedAuthor)
            return updatedAuthor
        },
        AddAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })
            console.log('author in addAuthor', author)
            if (author.length > 0) {
                throw new GraphQLError('Author must be unique', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name
                    }
                })
            }
            if (args.name.length < 4) {
                throw new GraphQLError('Author name must be at least 4 characters long', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name
                    }
                })
            }
            // const author = { ...args, id: uuid() }
            // authors = authors.concat(author)
            const newAuthor = new Author({ ...args })
            return await newAuthor.save()
        },
        createUser: async (root, args) => {
            const user = new User({ ...args })

            return await user.save()
                .catch(error => {
                    throw new GraphQLError(error.message, {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.username,
                            error
                        }
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== 'secret') {
                throw new GraphQLError('Wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.username
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    // The object returned by context is given to all resolvers as their third parameter. 
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        // remember to add bearer to authorization in sandbox
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(
            auth.substring(7), process.env.JWT_SECRET
        )
            const currentUser = await User
            .findById(decodedToken.id)
            return { currentUser }
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})