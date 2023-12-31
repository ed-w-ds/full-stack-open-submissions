// The useQueryClient hook returns the current QueryClient instance.
import { useMutation, useQueryClient } from 'react-query'

import { createAnecdote } from "../requests"

import { useNotificationDispatch } from '../CreateContext'

const AnecdoteForm = () => {
  // const [notification, dispatch] = useContext(NotificationContext)
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries('anecdotes')
      // so we don't have to get all anecdotes again
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      dispatch({ type: 'SET_NOTIFICATION', data: `you created '${newAnecdote.content}'` })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 3000)
    },
    onError: () => {
      dispatch({ type: 'SET_ERROR' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ERROR' })
      }, 3000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
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
