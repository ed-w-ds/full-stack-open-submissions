// libraries and frameworks
import { useQuery } from 'react-query'

// components
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

// requests
import { getAnecdotes } from './requests'

const App = () => {
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

  if (status === 'loading') {
    return <div>Loading anecdotes...</div>
  }

  if (status === 'error') {
    return <div>anecdote service not available due to problems in the server</div>
  }

  console.log('anecdotes', anecdotes)

  const handleVote = (anecdote) => {
    console.log('vote')
  }

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
