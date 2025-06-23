import { useDispatch, useSelector } from "react-redux"
import { increaseVote } from "../reducers/anecdoteReducer"
import { notificationHandler} from "../reducers/notificationReducer"


const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        return state.anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    //console.log(anecdotes)
    const dispatch = useDispatch()

    const vote = async(id) => {
        //console.log('vote', id)
        const anecdote = anecdotes.find(anecdote => anecdote.id === id)
        //console.log(anecdote)
        
        dispatch(increaseVote(anecdote))
        dispatch(notificationHandler(`you voted '${anecdote.content}'`,10))
        
    }
    return (
        <div>
            {[...anecdotes].sort((a,b) => b.votes - a.votes)
            .map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList