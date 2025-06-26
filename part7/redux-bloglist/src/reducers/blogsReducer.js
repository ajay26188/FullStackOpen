import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        updateBlog(state,action) {
            const newState = state.map(blog => 
                blog.id === action.payload.id ?
                action.payload : blog
                )
            return newState
        },
        appendBlog(state,action) {
            state.push(action.payload)
        },
        setBlogs(state,action) {
            return action.payload
        },
        removeBlog(state,action) {
            return state.filter(blog => blog.id !== action.payload)
        }
    }
})

export const {setBlogs, appendBlog, updateBlog, removeBlog} = blogsSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    }
}

export const addBlog = blog => {
    return async dispatch => {
      const newBlog = await blogService.create(blog)
      dispatch(appendBlog(newBlog))
    }
}

export const updateLike = (newBlog, oldBlog) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(newBlog, oldBlog)
        dispatch(updateBlog(updatedBlog))
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch(removeBlog(blog.id))
    }
}

export default blogsSlice.reducer