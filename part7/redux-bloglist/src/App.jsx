import { useEffect, useState } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { login, logout} from './reducers/userReducer'
import Users from './components/Users'
import {Link, Routes, Route, useNavigate, useMatch} from 'react-router-dom'
import Home from './components/Home'
import User from './components/User'
import { initializeUsers } from './reducers/usersReducer'
import BlogExpansion from './components/BlogExpansion'
import {Container} from '@mui/material'


function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const navigate = useNavigate()
  
  const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
        <Link style={padding} to='/users'>users</Link>
        <Link style={padding} to='/'>blogs</Link>
      </div>
    )
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  },[])

  useEffect(() => {
    dispatch(initializeUsers())
},[])

  //this is used for page refreshment
  //when page is refershed without looging out 
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser) //parse when you get local storage items
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  },[])

  const handleLogOut = () => {
    dispatch(logout())
    window.localStorage.removeItem('loggedUser')
    navigate('/login')
  }

  const match = useMatch('/users/:id')
  const matchedUser = match ?
  users.find(user => user.id === (match.params.id))
  : null

  //console.log(blogs)
  const matchBlog = useMatch('/blogs/:id')
  const matchedBlog = matchBlog ?
  blogs.find(blog => blog.id === (matchBlog.params.id))
  : null

  return (
    <Container>
      {user === null ?
      //<Navigate replace to="/login" />
        <LoginForm />
        :
        <div>
          <Menu />
          <p>{user.name} logged in 
          <button onClick={handleLogOut}>logout</button> </p>
          <Notification />
          
          <Routes>
            <Route path='/users' element={<Users />} />
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/users/:id' element={<User user={matchedUser} />} />
            <Route path='/blogs/:id' element={<BlogExpansion blog={matchedBlog} />} />
          </Routes>
        </div>
      }
      
    </Container>
  )
}

export default App
