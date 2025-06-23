import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const [notification,setNotification] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    },
    //error message is in server.js
    onError: (error) => {
      const message = error?.response?.data?.error || 'Error accured'
      setNotification({
        type: 'MUTATION_ERROR',
        payload: message
      })
      setNotification(() => {
        type: 'RESET'
      },5000)
    }

    // newAnecdote is basically the result of createAnecdote function
    /*
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({queryKey: ['anecdotes']})
      queryClient.setQueryData({queryKey: ['anecdotes']}, anecdotes.concat(newAnecdote))
    }
    */
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({content, votes:0})
    setNotification({
        type: 'CREATE_ANECDOTE',
        payload: `anecdote '${content}' added`
    })
    setTimeout(() => {
      setNotification({
        type: 'RESET'
      })
    },5000)
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
