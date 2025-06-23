import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notificationHandler } from "../reducers/notificationReducer"


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    //event handler for form submission
    const addAnecdote = async(event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        //console.log(anecdote)
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdote))
        dispatch(notificationHandler(`you added '${anecdote}'`,10))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input name='anecdote' /></div>
            <button>create</button>
            </form>
        </div>
        
    )
}

export default AnecdoteForm