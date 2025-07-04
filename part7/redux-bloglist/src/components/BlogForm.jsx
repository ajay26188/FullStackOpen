import { useState } from "react"

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    //Blog Form handling creation of a new blog
    const handleBlog= async (event) => {
        event.preventDefault()
        createBlog({
            title,
            author,
            url
        })
        setTitle('')
        setAuthor('')
        setUrl('')

    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleBlog}>
                <div>
                    title:
                    <input
                    data-testid='title'
                    type="text"
                    name='title'
                    value={title}
                    onChange={({target}) => setTitle(target.value)}
                    />
                </div>

                <div>
                    author:
                    <input
                    data-testid='author'
                    type="text"
                    name='author'
                    value={author}
                    onChange={({target}) => setAuthor(target.value)}
                    />
                </div>

                <div>
                    url:
                    <input
                    data-testid='url'
                    type="text"
                    name='url'
                    value={url}
                    onChange={({target}) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
            
        </div>
    )
}

export default BlogForm