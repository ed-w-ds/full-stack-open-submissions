import { useSelector, useDispatch } from 'react-redux'

import { vote, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  // const createAnecdote = (event) => {
  //   event.preventDefault()
  //   const content = event.target.anecdote.value
  //   console.log('content', content) 
  //   event.target.anecdote.value = ''
  //   dispatch({
  //     type: 'NEW_ANECDOTE',
  //     payload: {
  //       content,
  //       id: generateId(),
  //       votes: 0
  //     }
  //   })
  // }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log('content', content)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={ addAnecdote }>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App