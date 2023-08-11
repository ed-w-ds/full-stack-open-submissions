import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { filterChange } from './reducers/filterReducer'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {

  const Filter = () => {
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const handleChange = (event) => {
      // input-field value is in variable event.target.value
      dispatch(filterChange(event.target.value))
    }
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input
          value={filter}
          onChange={handleChange}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App