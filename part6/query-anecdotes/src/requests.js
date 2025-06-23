import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
    return axios.get(baseURL)
    .then (response => response.data)
}

export const createAnecdote = (newAnecdote) => {
    return axios.post(baseURL, newAnecdote)
    .then(response => response.data)
}

export const updateAnecdote = (updatedAnecdote) => {
    console.log(updatedAnecdote)
    return axios.put(`${baseURL}/${updatedAnecdote.id}`, updatedAnecdote)
    .then(response => response.data)
}