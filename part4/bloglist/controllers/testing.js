const router = require('express').Router()
const Blog = require('../models/bloglist')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  console.log('Resetting DB..')
  await Blog.deleteMany({})
  await User.deleteMany({})
  await User.collection.dropIndexes() 
  console.log('Reset complete..')
  response.status(204).end()
})

module.exports = router