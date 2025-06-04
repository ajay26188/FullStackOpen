require('dotenv').config()
const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/',async(request,response) => {
    const {username, password} = request.body

    //we use .findOne to find one user
    const user = await User.findOne({username})

    const correctPassword = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && correctPassword)) {
        return response.status(401).json({error: 'invalid username or password'})
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    response
    .status(200)
    .json({token: token, username: user.username, name: user.name})
})

module.exports = loginRouter