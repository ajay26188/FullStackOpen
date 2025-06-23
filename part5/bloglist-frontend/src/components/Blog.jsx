import { useState } from "react"
//import blogService from '../services/blogs'

const Blog = ({blog, user, handleDeletion, handleLikes}) => {
    //console.log(blog)
    const [detailsVisible, setDetailsVisible] = useState(false)
    
    const hideWhenVisible = {display: detailsVisible ? 'none' : ''}
    const showWhenVisible = {display: detailsVisible ? '' : 'none'}

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={(blogStyle)}>
            <div style={hideWhenVisible} className="defaultBlogContents">
                {blog.title} {blog.author} 
                <button onClick={()=>setDetailsVisible(true)}>view</button>
            </div>

            <div style={showWhenVisible} className="showAllContents">
                {blog.title} {blog.author}

                <button onClick={()=>setDetailsVisible(false)}>hide</button>

                <br/>
                {blog.url}

                <br/>
                likes {blog.likes}<button onClick={()=>handleLikes(blog)}>like</button>

                <br/>
                {blog.user[0].name}

                <br/>
                {user.username === blog.user[0].username ? <button style={{background:"red"}}onClick={()=> handleDeletion(blog)}>remove</button> : ''}
                
            </div>
            
        </div>
    )
}

export default Blog
