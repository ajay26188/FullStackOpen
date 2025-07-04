import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data //all blogs fetched from backend
}

//remember to send config (tokens) if its user restricted
const create = async(newBlog) => {
    const config = {
        headers: {Authorization: token},
    }
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const update = async(newBlog,oldBlog) => {
    const config = {
        headers: {Authorization: token},
    }
    const response = await axios.put(`${baseUrl}/${oldBlog.id}`, newBlog, config)
    return response.data
}

const remove = async(id) => {
    const config = {
        headers: {Authorization: token},
    }
    const response = await axios.delete(`${baseUrl}/${id}`,config)
    return response.data
}

const addComment = async(id,comment) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, comment )
    return response.data
}

export default {getAll, create, setToken, remove, update, addComment}