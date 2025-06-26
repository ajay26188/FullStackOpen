import { useDispatch, useSelector } from 'react-redux'
import { addBlog, deleteBlog, updateLike } from '../reducers/blogsReducer'
import Togglable from '../components/Togglable'
import { notificationSetter } from '../reducers/notificationReducer'
import { notificationTypeSetter } from '../reducers/notificationReducer'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const Home = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    const blogStyle = {
        display: 'block',
        padding: '10px 15px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        color: '#333',
        textDecoration: 'none',
        fontWeight: '500',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        transition: 'background-color 0.2s ease, transform 0.2s ease',
      }
      
    
    const createBlog = async(blogObject) => {
      try {
        dispatch(addBlog(blogObject))
        dispatch(notificationSetter(`a new blog ${blogObject.title} by ${blogObject.author} added`))
        dispatch(notificationTypeSetter('success'))
        setTimeout(() => {
            dispatch(notificationSetter(null))
        },5000)
    }
    catch(exception) {
        console.log(exception)
    }
    }

    return (
        <div>
            <h2>blog app</h2>
            <Togglable buttonLabel="create new blog">
            <BlogForm createBlog={createBlog} />
            </Togglable>
          
            {/* first sort the blogs based on likes and then map*/}
            <ul style={{ listStyle: 'none', padding: 0 }}>
            {[...blogs].sort((a,b)=>b.likes - a.likes).map(blog =>
            <li key={blog.id} >
                <Link style={blogStyle} to={`/blogs/${blog.id}`}>
                    {blog.title} {blog.author}
                </Link>
            </li> 
            )}
            </ul>
              
        </div>
    )
}

export default Home
