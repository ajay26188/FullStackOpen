import {createSlice, current} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
*/

const anecdoteSlicer = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setVote(state, action) {
      console.log(current(state))
      console.log(action)
      const anecdote = state.find(anecdote =>
         anecdote.id === action.payload.id)
        //console.log(anecdote)
        //const votedAnecdote = {...anecdote, votes: anecdote.votes+1}
        return state.map(anecdote => 
          anecdote.id === action.payload.id ? 
          action.payload : anecdote
        )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

/*
//reducer function
const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.payload]

    case 'SET_VOTE':
      const anecdote = state.find(anecdote => anecdote.id === action.payload.id)
      //console.log(anecdote)
      const votedAnecdote = {...anecdote, votes: anecdote.votes+1}
      return state.map(anecdote => 
        anecdote.id === action.payload.id ? 
        votedAnecdote : anecdote
      )
    
      default: 
        return state
  }
}

//action creators
export const createAnecdote = (anecdote) => {
  return {
      type: 'NEW_ANECDOTE',
      payload: {
        content: anecdote,
        id: getId(),
        votes: 0
      }
    } 
}

export const handleVotes = (id) => {
  return {
    type: 'SET_VOTE',
    payload: {id}
  }
}
*/

export const {setVote,setAnecdotes,appendAnecdote} = anecdoteSlicer.actions

//REDUX THUNK library action creators
//returns a function instead of an object
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async(dispatch) => {
    const anecdoteObject = await anecdoteService.create(anecdote)
    dispatch(appendAnecdote(anecdoteObject))
  }
}

export const increaseVote = (anecdote) => {
  return async(dispatch) => {
    const updatedVote = await anecdoteService.update(anecdote)
    dispatch(setVote(updatedVote))
  }
}

export default anecdoteSlicer.reducer