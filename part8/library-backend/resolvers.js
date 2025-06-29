const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
require('dotenv').config()
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async() => Book.collection.countDocuments(),
      allBooks: async(root, args) => {
          if (!args.author && !args.genre) {
              return Book.find({}).populate('author')
          }
  
          
          if (args.author && args.genre) {
            const findAuthor = await Author.findOne({name: args.author})
  
            if (!findAuthor) {
              return null
            }
  
            return Book.find({author: findAuthor._id, genres: args.genre}).populate('author')
          }
          
          if (args.author) {
            const findAuthor = await Author.findOne({name: args.author})
  
            if (!findAuthor) {
              return null
            }
  
            return Book.find({author: findAuthor._id}).populate('author')
          }
          
          if (args.genre) {
              return Book.find({genres: args.genre}).populate('author')
          }
          
      },
      authorCount: async() => Author.collection.countDocuments(),
      allAuthors: async(root) => Author.find({}),
      me : (root, args, context) => {
        return context.currentUser
      }
    },
  
    Author: {
      
      bookCount: async(root) => {
          const books = await Book.find({
            author: {$in: [root._id]}
          })
          return books.length
      }
    },
  
    Mutation: {
      addBook: async(root, args, context) =>{
          const book = new Book({...args})
  
          const currentUser = context.currentUser
  
          if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: {
                code: 'BAD_USER_INPUT',
              }
            })
          }
  
          let author = await Author.findOne({name: args.author})
  
          if (!author) {
            author = new Author({
              name: args.author,
            })
            try {
              await author.save()
            } catch (error) {
              throw new GraphQLError('Author name too short. Minimun length is 4.', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.name,
                  error
                }
              })
            }
          }
          book.author = author._id
          try {
            await book.save()
          } catch (error) {
            throw new GraphQLError('Saving book failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.title,
                error
              }
            })
          }
          
        const populatedBook = await book.populate('author')
        pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })
        return populatedBook

      },
  
      editAuthor: async(root, args, context) =>{
          const author = await Author.findOne({name: args.name})
  
          const currentUser = context.currentUser
          if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: {
                code: 'BAD_USER_INPUT',
              }
            })
          }
  
          if (!author) {
              return null
          }
          author.born = args.setBornTo
          return author.save()
      },
  
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
    
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
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
    
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
    },
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
      },
  }

module.exports = resolvers