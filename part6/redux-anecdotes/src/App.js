import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   anecdoteService.getAll().then(anecdotes =>
  //     dispatch(setAnecdotes(anecdotes))
  //   )
  // }, [AnecdoteList]) // eslint-disable-line react-hooks/exhaustive-deps 
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App