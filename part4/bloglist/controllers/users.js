const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

usersRouter.get('/',async(request,response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

usersRouter.post('/',async(request,response) => {
    const {username, name, password} = request.body

    if (!username || !password) {
        return response.status(400).json({error: 'uername and password both must be given'})
    }

    if (username.length < 3 || password.length < 3) {
        return response.status(400).json({error: 'uername and password must be at least 3 character long'})
    }
    //next two lines for hashing password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(user)
})

module.exports = usersRouter