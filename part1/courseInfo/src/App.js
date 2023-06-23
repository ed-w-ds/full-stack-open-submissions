import {useEffect, useState} from 'react';

const Header = (props) => {
  return (
    <h1> { props.course } </h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={ props.part[0].name } exercise={ props.part[0].exercise } />
      <Part part={ props.part[1].name } exercise={ props.part[1].exercise } />
      <Part part={ props.part[2].name } exercise={ props.part[2].exercise } />
    </div>
  )
}
const Part = (props) => {
  return (
    console.log(props),
    <p> { props.part } { props.exercise } </p>
  )
}

const Total = (props) => {
  return (
    console.log(props),
    <p>Number of exercises { props.part[0].exercise + props.part[1].exercise + props.part[2].exercise }</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      // index 0
      {
        name: 'Fundamentals of React',
        exercise: 10
      },
      // index 1
      {
        name: 'Using props to pass data',
        exercise: 7
      },
      // index 2
      {
        name: 'State of a component',
        exercise: 14
      }
    ]
  }

  // counter state
  // const [ counter, setCounter ] = useState(0)
  
  return (
    <>
      <div>
        <Header course={ course.name } />
        <Content part={ course.parts } />
        <Total part={ course.parts } />
      </div>
      {/* counter state 2 */}
      {/* <div>
        <div> { counter } </div>
        <button onClick={ () => setCounter(counter + 1) }>plus</button>              
        <button onClick={ () => setCounter(0) }>set to 0</button>
      </div> */}
    </>
  )
}

export default App