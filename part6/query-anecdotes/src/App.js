// libraries and frameworks
import { useQuery, useMutation, useQueryClient } from 'react-query'

// components
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

// requests
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const { data: anecdotes, status } = useQuery(
    // queryKey
    'anecdotes', 
    // queryFn
    getAnecdotes,
    {
      // options
      retry: 1,
      refetchOnWindowFocus: false
    })
  // const anecdotes = data is the same as using data: anecdotes in the object

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries('anecdotes')
      // so we don't have to get all anecdotes again:
      const anecdotes = queryClient.getQueryData('anecdotes')
      const updatedAnecdotes = anecdotes.map(anecdote => anecdote.id === newAnecdote.id ? newAnecdote : anecdote)
      queryClient.setQueryData('anecdotes', updatedAnecdotes)
    },
  })

  const handleVote = (anecdote) => {
    console.log('vote anecdote.id', anecdote.id)
    console.log('vote anecdote.content', anecdote.content)
    console.log('vote anecdote.votes', anecdote.votes)
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
  }

  if (status === 'loading') {
    return <div>Loading anecdotes...</div>
  }

  if (status === 'error') {
    return <div>anecdote service not available due to problems in the server</div>
  }

  console.log('anecdotes', anecdotes)

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
