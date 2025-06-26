import { useSelector, useDispatch } from "react-redux"
import { updateLike, deleteBlog } from "../reducers/blogsReducer"
import { useNavigate } from "react-router-dom"
import CommentForm from "./CommentForm"

const BlogExpansion = ({blog}) => {
    //console.log(blog)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    if (!blog) {
        return null
    }
    
    
    const handleDeletion = async(blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                dispatch(deleteBlog(blog)) 
                navigate('/')
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
          dispatch(updateLike(updatedBlog,blog)) 
      }
      catch (error) {
          console.error('error while updating:',error.message)
      }
    }
    return (
        <div>
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url}</a>

            <br/>
            likes {blog.likes}<button onClick={()=>handleLikes(blog)}>like</button>

            <br/>
            added by {blog.user[0].name}

            <br/>
            {user.username === blog.user[0].username ? <button style={{background:"red"}}onClick={()=> handleDeletion(blog)}>remove</button> : ''}

            <h2>comments</h2>
            <CommentForm blog={(blog)}/>
            <ul>
                {blog.comments.map(comment => 
                    <li key={comment}>
                        {comment}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default BlogExpansion
