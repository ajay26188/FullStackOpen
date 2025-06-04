const { test, describe, after, beforeEach} = require('node:test')
const assert = require('node:assert/strict')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper') //test_helper
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      await User.init()
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })

    test('creation fails if usernames or passwords are missing',async() => {
        const usersAtStart = await helper.usersInDb()

        const newUser1 = {
            name: 'Matti Luukkainen',
            password: 'salinen'
        }

        const newUser2 = {
            username: 'root',
            name: 'Matti Luukkainen'
        }

        const result1 =await api
        .post('/api/users')
        .send(newUser1)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const result2 =await api
        .post('/api/users')
        .send(newUser2)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
      
      assert(result1.body.error.includes('uername and password both must be given'))

      assert(result2.body.error.includes('uername and password both must be given'))

      assert.strictEqual(usersAtStart.length,usersAtEnd.length)
    })

    test('creation fails if usernames and passwords are less than 3 characters long',async() => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ro',
            name: 'Matti Luukkainen',
            password: 'sa'
          }
        const result =await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        //console.log(result.body);
        //console.log(result.body.error);

        const usersAtEnd = await helper.usersInDb()
      
      assert(result.body.error.includes('uername and password must be at least 3 character long'))

      assert.strictEqual(usersAtStart.length,usersAtEnd.length)
    })
  
    test('creation fails with a duplicate username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'root',
        name: 'Matti Luukkainen',
        password: 'salainen'
      }
      
      const result =await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      
      assert(result.body.error.includes('expected `username` to be unique'))

      assert.strictEqual(usersAtStart.length,usersAtEnd.length)

    })
})

after(async() => {
  mongoose.connection.close()
})