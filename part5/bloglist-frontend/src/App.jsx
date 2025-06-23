import { useEffect, useState } from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    const fetchBlogs = async() => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  },[])

  //this is used for page refreshment
  //when page is refershed without looging out 
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user) //parse when you get local storage items
      blogService.setToken(user.token)
    }
  },[])

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const handleDeletion = async(blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        try {
            await blogService.remove(blog.id)
            setBlogs(blogs.filter(b => b.id !== blog.id))  
        }
        catch(error) {
            console.error('error occured while deleting.',error.message)
        }
    }  
}

const handleLikes = async(blog) => {
  //console.log(blog)
  const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user[0].id,
      likes: blog.likes + 1
  }
  try {
      const returnedBlog = await blogService.update(updatedBlog,blog)
      // Update blog in state to trigger re-render with new likes
      setBlogs(prevBlogs =>
        prevBlogs.map(b => b.id === blog.id ? {...b, likes: returnedBlog.likes} : b))
      
  }
  catch (error) {
      console.error('error while updating:',error.message)
  }
}

const createBlog = async(blogObject) => {
  try {
    const newBlog = await blogService.create(blogObject)

    setBlogs((prevBlogs) => [...prevBlogs, newBlog])
    setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setNotificationType('success')
    setTimeout(() => {
        setNotification(null)
    },5000)
}
catch(exception) {
    console.log(exception)
}
}

  return (
    <div>
      {user === null ?
        <LoginForm 
        setUser={setUser}
        notification={notification}
        setNotification={setNotification}
        notificationType={notificationType}
        setNotificationType={setNotificationType}
        />
        :
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} notificationType={notificationType}/>
          <p>{user.name} logged in <button onClick={handleLogOut}>logout</button></p>
          <Togglable buttonLabel="create new blog">
            <BlogForm createBlog={createBlog} />
          </Togglable>
          
          {/* first sort the blogs based on likes and then map*/}
          {blogs.sort((a,b)=>b.likes - a.likes).map(blog => 
          <Blog key={blog.id} blog={blog} user={user} handleDeletion={handleDeletion} handleLikes={handleLikes} />)}
        </div>
      }
      
    </div>
  )
}

export default App
