const User = ({user}) => {
    //console.log(user)
    if (!user) {
        return null
    }
    return (
        <div>
            <h2>{user.name}</h2>
            <p><strong>added blogs</strong></p>
            <ul>
                {user.blogs.map(blog => 
                    <li key ={blog.id}>
                        {blog.title}
                    </li>
                    )
                }
                
            </ul>
        </div>
    )
}

export default User