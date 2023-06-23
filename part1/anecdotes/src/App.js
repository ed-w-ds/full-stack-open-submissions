import { useState } from 'react';
import * as Math from 'mathjs';

const Button = ( {text, handleClick} ) => {
  return (
    <button onClick={ handleClick } >
      { text }
    </button>
  )
}
const Votes = ( { votes } ) => {
  return (
    <p>has { votes } votes</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]


  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const votes = [...points]

  const handleVote = () => {
    const updatedPoints = [...points];
    updatedPoints[selected] += 1;
    setPoints(updatedPoints);
  };

  const selectedAnecdote = () => { 
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  // stores max value in points array
  const mostVotes = Math.max(...points);

  return (
    <div>
      <p>{ anecdotes[selected] }</p>
      <Votes votes={ votes[selected] }/>
      <Button handleClick={ selectedAnecdote } text='Next Anecdote' />
      <Button handleClick={ handleVote } text='Vote' />
      {/* selects the index of the points array that has the most votes that corresponds to the index of the most voted array */}
      <p> { anecdotes[points.indexOf(mostVotes)] } </p>
    </div>
  )
}

export default App