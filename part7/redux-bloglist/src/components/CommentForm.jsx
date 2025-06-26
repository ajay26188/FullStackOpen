import { useState } from "react"
import blogService from '../services/blogs'
import { updateBlog } from "../reducers/blogsReducer"
import { useDispatch } from "react-redux"

const CommentForm = ({blog}) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState("")

    const handleSubmit = async(event) => {
        event.preventDefault();
        //send comment as an object
        const response = await blogService.addComment(blog.id,{comment})
        dispatch(updateBlog(response))
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                    <input 
                    type="textbox"
                    value={comment}
                    onChange={(event)=> setComment(event.target.value)}
                    />
                
                <button type="submit">add comment</button>
            </form>
            
            
        </div>
    )
}

export default CommentForm