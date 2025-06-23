import axios from "axios";

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async() => {
    const response = await axios.get(baseURL)
    return response.data
}

const create = async(anecdote) => {
    const object = {
        content: anecdote,
        votes: 0
    }
    const response = await axios.post(baseURL, object)
    return response.data
}

const update = async (anecdote) => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes+1}
    const response = await axios.put(`${baseURL}/${anecdote.id}`,updatedAnecdote)
    return response.data
}

export default {getAll, create, update}