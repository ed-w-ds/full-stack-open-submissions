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
  
  return (
    <div>
      <Header course={ course.name } />
      <Content part={ course.parts } />
      <Total part={ course.parts } />
    </div>
  )
}

export default App