import { useState } from 'react';

const Button = ( {text, handleClick} ) => {
  return (
    <button onClick={ handleClick }>
      { text }
    </button>
  )
}

const Statistics = ( {good, neutral, bad} ) => {
  const all = good + bad + neutral;
  return (
    <div>
      <h2>Statistics</h2>
      { all === 0 ? <p>No feedback given</p> : (
        <>
        <table>
          <StatisticLine text='Good' value={ good } />
          <StatisticLine text='Neutral' value={ neutral } />
          <StatisticLine text='Bad' value={ bad } />
          <StatisticLine text='all' value={ all } />
          <StatisticLine text='average' value={ ((good - bad) / (all)).toFixed(2) } />
          <StatisticLine text='positive' value={ (good / all * 100).toFixed(2) + '%' } />
        </table>
        </>
      )} 
    </div>
  )
}

const StatisticLine = ( {text, value} ) => {
  return (
    <tbody>
      <tr>
        <td>{ text } </td> 
        <td>{ value }</td>
      </tr>
    </tbody>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={ () => setGood(good + 1) } text='Good' />
      <Button handleClick={ () => setNeutral(neutral + 1) } text='Neutral' />
      <Button handleClick={ () => setBad(bad + 1) } text='Bad' />
      {/* <h2>Statistics</h2>
      <p>Good: { good }</p>
      <p>Neutral: { neutral }</p>
      <p>Bad: { bad }</p>
      <p>all { good + bad + neutral }</p>
      <p> average { ((good - bad) / (good + bad + neutral).toFixed(2)) }</p> */}
      <Statistics good={ good } neutral={ neutral } bad={ bad } />
    </div>
  )
}

export default App;
