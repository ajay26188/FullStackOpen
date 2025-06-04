require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/bloglist.js')
const blogsRouter = require('./controllers/bloglists.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')
const {MONGODB_URI,TEST_MONGODB_URI} = require('./utils/config.js')
const {info , error} = require('./utils/logger.js')
const middleware = require('./utils/middleware.js')

const app = express()

info('connecting to MONOGODB...')

mongoose.connect(process.env.NODE_ENV === 'test' ? TEST_MONGODB_URI : MONGODB_URI)
.then(() => {
    info('connected to mongodb',)
})
.catch((err) => {
    error('connection to mongodb failed.',err.message)
})

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app