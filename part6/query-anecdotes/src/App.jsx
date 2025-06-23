import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext, { NotificationContextProvider } from './NotificationContext'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'

const App = () => {
  const [notification,setNotification] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const updateVoteMutataion = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
    
    /*
   onSuccess: (updatedAnecdote) => {
    const anecdotes = queryClient.getQueryData({queryKey: ['anecdotes']})
    queryClient.setQueryData({queryKey: ['anecdotes']}, anecdotes.map(anecdote => 
      anecdote.id === updatedAnecdote.id ? 
      updatedAnecdote : anecdote
    ))
   }
   */

  })

  const handleVote = (anecdote) => {
    updateVoteMutataion.mutate({...anecdote, votes: anecdote.votes+1})
    setNotification({
      type: 'VOTE_ANECDOTE',
      payload: `anecdote '${anecdote.content}' voted`
    })
    setTimeout(() => {
      setNotification({
        type: 'RESET'
      })
    },5000)
  }

  //query for fetching all anecdotes at start
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false, 
    refetchOnWindowFocus: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data
  console.log(anecdotes)

  return (
    <div>
      <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
  
    </div>
  )
}

export default App
