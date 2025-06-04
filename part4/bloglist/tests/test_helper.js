const Blog = require('../models/bloglist')
const User = require('../models/user')

const initialBlogs = [
    {
      title: 'The Creative Penn',
      author: 'Joanna Penn',
      url: 'https://www.thecreativepenn.com/',
      likes: 100
    },
    {
      title: 'CSS-Tricks',
      author: 'Chris Coyier',
      url: 'https://css-tricks.com/',
      likes: 250
    }
]
  
/*
const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}
*/

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}