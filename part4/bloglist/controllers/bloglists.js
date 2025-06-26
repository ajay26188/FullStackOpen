//new Express router instance for handling blog-related routes
require('dotenv').config()
const blogsRouter = require('express').Router()
const Blog = require('../models/bloglist.js')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {userExtractor} = require('../utils/middleware')

blogsRouter.get('/', async(request, response) => {
  const blogs =await Blog.find({}).populate('user')
  response.json(blogs)
})
  
blogsRouter.post('/', userExtractor, async(request, response) => {
    const blog = request.body
    if (!blog.title || !blog.url) {
      return response.status(400).json({error: 'title and url both must be provided'})
    }

    //get user from request object
    const user = request.user

    // Create blog with likes defaulting to 0 if undefined or null
    const newBlog = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: user._id,
      likes: blog.likes ?? 0
    })
    const savedBlog =await newBlog.save()

    //console.log(user);
    // Add blog ID to the user's blog list
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    //Populate the user before sending the response
    await savedBlog.populate('user')

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async(request, response) => {
  //get user from request object
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blog.user.toString() === user._id.toString()) {
    //Deleting blog
    await Blog.findByIdAndDelete(request.params.id)

    // Removing blog ID from user's blogs array
    //blog.user is the ID of the user who had written the blog
    await User.findByIdAndUpdate(blog.user, {
    $pull: { blogs: blog._id }
  })
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async(request, response) => {
  const {title,author,url,likes,user} = request.body

  const oldBlog = await Blog.findById(request.params.id)
  if (!oldBlog) {
    return response.status(404).end()
  }

  oldBlog.title = title,
  oldBlog.author = author,
  oldBlog.url = url,
  oldBlog.likes = likes
  oldBlog.user = user

  const updatedBlog = await oldBlog.save()
  const populatedBlog = await updatedBlog.populate('user', { username: 1, name: 1 })
  response.json(populatedBlog)
})

blogsRouter.post('/:id/comments', async(request, response) => {
  const {comment} = request.body

  const oldBlog = await Blog.findById(request.params.id)
  if (!oldBlog) {
    return response.status(404).end()
  }

  //if comments doesn't exist this line will initialize it else this will will do nothing
  oldBlog.comments = oldBlog.comments || []
  oldBlog.comments.push(comment)

  const updatedBlog = await oldBlog.save()
  const populatedBlog = await updatedBlog.populate('user', { username: 1, name: 1 })
  response.json(populatedBlog)
})

module.exports = blogsRouter

