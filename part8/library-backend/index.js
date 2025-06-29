const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const Author = require('./models/author')
const Book = require('./models/book')
require('dotenv').config()
const User = require('./models/user')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')


const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('connected to MongoDB')

    const authorCount = await Author.countDocuments()
    if (authorCount === 0) {
      const insertedAuthors = await Author.insertMany([
        { name: 'Robert Martin', born: 1952 },
        { name: 'Martin Fowler', born: 1963 },
        { name: 'Fyodor Dostoevsky', born: 1821 },
        { name: 'Joshua Kerievsky' },
        { name: 'Sandi Metz' }
      ])
      console.log('Authors inserted')

      const authorMap = {}
      insertedAuthors.forEach(a => { authorMap[a.name] = a._id })

      await Book.insertMany([
        {
          title: 'Clean Code',
          published: 2008,
          author: authorMap['Robert Martin'],
          genres: ['refactoring']
        },
        {
          title: 'Agile software development',
          published: 2002,
          author: authorMap['Robert Martin'],
          genres: ['agile', 'patterns', 'design']
        },
        {
          title: 'Refactoring, edition 2',
          published: 2018,
          author: authorMap['Martin Fowler'],
          genres: ['refactoring']
        },
        {
          title: 'Refactoring to patterns',
          published: 2008,
          author: authorMap['Joshua Kerievsky'],
          genres: ['refactoring', 'patterns']
        },
        {
          title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
          published: 2012,
          author: authorMap['Sandi Metz'],
          genres: ['refactoring', 'design']
        },
        {
          title: 'Crime and punishment',
          published: 1866,
          author: authorMap['Fyodor Dostoevsky'],
          genres: ['classic', 'crime']
        },
        {
          title: 'Demons',
          published: 1872,
          author: authorMap['Fyodor Dostoevsky'],
          genres: ['classic', 'revolution']
        },
      ])
      console.log('Books inserted')
    }
  })

  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
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
