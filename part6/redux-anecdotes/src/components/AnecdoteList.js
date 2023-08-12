import { useDispatch, useSelector } from 'react-redux'

import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    
    console.log('anecdotes', useSelector(state => state.anecdotes))
    console.log('filter', useSelector(state => state.filter))
    console.log('anecdotes.filter', useSelector(state => state.anecdotes.filter(anecdote => anecdote.content
        .toLowerCase()
        .includes(state.filter.toLowerCase()))))

    const anecdotes = useSelector(state => 
        state.anecdotes.filter(anecdote => anecdote.content
            .toLowerCase()
            .includes(state.filter.toLowerCase()))
    )    

    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

    const dispatch = useDispatch()
    const voteAnecdote = (id) => {
        dispatch(vote(id))
        console.log('anecdotes.find', anecdotes.find(anecdote => anecdote.id === id).content)
        dispatch(setNotification(`you voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`))
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000)
    }

    return (
        <>
            {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes} votes
                <button onClick={ () => voteAnecdote(anecdote.id) }>vote</button>
                </div>
            </div>
            )}
        </>
    )
}

export default AnecdoteList