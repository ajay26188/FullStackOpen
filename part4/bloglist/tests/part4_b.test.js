const { test, describe, after, beforeEach} = require('node:test')
const assert = require('node:assert/strict')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper') //test_helper
const Blog = require('../models/bloglist')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const api = supertest(app)


beforeEach(async() => {
  await Blog.deleteMany({})
  const user = await User.findOne({username: 'root'})

  const newInitialBlogs = helper.initialBlogs.map(blog => ({...blog, user:user._id}))

  await Blog.insertMany(newInitialBlogs)
})


test('blogs are returned in JSON format',async()=> {
  await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
})

test('correct amount of blog posts',async() => {
  const blogs = await api.get('/api/blogs')
  //console.log(blogs.body)
  assert.strictEqual(blogs.body.length,helper.initialBlogs.length)
})

test('a valid blog is added successfully',async() => {
  //Finding the user from database users
  //and signing a token
  const user = await User.findOne({username:"root"})
  const token = jwt.sign({username: user.username, id: user._id},process.env.SECRET)

    const newBlog = {
        title: 'Smashing Magazine',
        author: 'Vitaly Friedman',
        url: 'https://www.smashingmagazine.com/',
        likes: 180
      }
      await api
      .post('/api/blogs')
      .set("Authorization",`Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-type',/application\/json/)
      
      const blogsAtEnd = await helper.blogsInDb()
      //console.log(blogsAtEnd)
      assert.strictEqual(blogsAtEnd.length,helper.initialBlogs.length+1)

      const titles = blogsAtEnd.map((blog)=> blog.title)
      //console.log(titles)
      assert(titles.includes('Smashing Magazine'))
})

test('a blog cannot be added without a token',async() => {
  const newBlog = {
    title: 'High Magazine',
    author: 'Vitaly Friedman',
    url: 'https://www.highmagazine.com/',
    likes: 180
  }
  const result = await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(401)
  .expect('Content-Type', /application\/json/)

  console.log(result.body)
  assert(result.body.error.includes('token missing'))
  
  const blogsAtEnd = await helper.blogsInDb()
  //console.log(blogsAtEnd)
  assert.strictEqual(blogsAtEnd.length,helper.initialBlogs.length)

})

test('default value of likes is set to 0',async()=> {
  //Finding the user from database users
  //and signing a token
  const user = await User.findOne({username:"root"})
  const token = jwt.sign({username: user.username, id: user._id},process.env.SECRET)

    const newBlog = {
        title: 'A List Apart',
        author: 'Jeffrey Zeldman',
        url: 'https://alistapart.com/'
      }
      
      await api
      .post('/api/blogs')
      .set("Authorization",`Bearer ${token}`)
      .send({...newBlog, 'likes':0})
      .expect(201)
      .expect('Content-type',/application\/json/)
      
      const blogsAtEnd = await helper.blogsInDb()
      //console.log(blogsAtEnd)
      assert.strictEqual(blogsAtEnd.length,helper.initialBlogs.length+1)

      const titles = blogsAtEnd.map((blog)=> blog.title)
      //console.log(titles)
      assert(titles.includes('A List Apart'))
})

test('a blog cannot be added without title or url',async() => {
  //Finding the user from database users
  //and signing a token
  const user = await User.findOne({username:"root"})
  const token = jwt.sign({username: user.username, id: user._id},process.env.SECRET)

    const newBlog1 = {
        title: 'Smashing Magazine',
        author: 'Vitaly Friedman',
        likes: 180
    }
    const newBlog2 = {
        author: 'Vitaly Friedman',
        url: 'https://www.smashingmagazine.com/',
        likes: 180
    }
    await api
      .post('/api/blogs')
      .set("Authorization",`Bearer ${token}`)
      .send(newBlog1)
      .expect(400)

    await api
      .post('/api/blogs')
      .set("Authorization",`Bearer ${token}`)
      .send(newBlog2)
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()
    //console.log(blogsAtEnd)
    assert.strictEqual(blogsAtEnd.length,helper.initialBlogs.length)
})

test('a blog is deleted successfully',async()=>{
  //Finding the user from database users
  //and signing a token
  const user = await User.findOne({username:"root"})
  const token = jwt.sign({username: user.username, id: user._id},process.env.SECRET)

    const allBlogs = await helper.blogsInDb()
    const blogsToDelete = allBlogs[0]
    //console.log(blogsToDelete);

    await api
    .delete(`/api/blogs/${blogsToDelete.id}`)
    .set("Authorization",`Bearer ${token}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    //console.log(blogsAtEnd)
    const blogsAtEndTitles = blogsAtEnd.map(blog=> blog.title)
    //console.log(blogsAtEndTitles)

    assert.strictEqual(blogsAtEnd.length,helper.initialBlogs.length - 1)
    assert(!blogsAtEndTitles.includes('The Creative Penn'))
})

test('a blog is updated successfully',async()=>{
    const allBlogs = await helper.blogsInDb()
    const blogsToUpdate = allBlogs[0]
    //console.log(blogsToUpdate);

    await api
    .put(`/api/blogs/${blogsToUpdate.id}`)
    .send({...blogsToUpdate, 'likes':120})

    const blogsAtEnd = await helper.blogsInDb()
    //console.log(blogsAtEnd)

    assert.strictEqual(blogsAtEnd[0].likes,120)
})

after(async() => {
  mongoose.connection.close()
})