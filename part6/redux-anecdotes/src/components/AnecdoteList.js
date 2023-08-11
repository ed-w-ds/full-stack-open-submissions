import { useDispatch, useSelector } from 'react-redux'

import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => 
        state.anecdotes.filter(anecdote => anecdote.content
            .toLowerCase()
            .includes(state.filter.toLowerCase()))
    )

    const dispatch = useDispatch()

    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

    return (
        <>
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
        </>
    )
}

export default AnecdoteList