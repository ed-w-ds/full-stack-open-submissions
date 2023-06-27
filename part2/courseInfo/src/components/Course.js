const Course = ({ course }) => {
return (
    <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
    </div>
)
}

const Header = ({ course }) => {
return (
    <h1>{course.name}</h1>
)
}

const Content = ({ course }) => {
return (
    <div>
        <Part course={course} />
    </div>
)
}

const Part  = ({ course }) => {
return (
    <div>
        {course.parts.map(part => <p key={ part.id }>{ part.name } { part.exercises }</p>)}
    </div>
)
}

const Total = ({ course }) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p><b>total of { total } exercises</b></p>
    )
}

export default Course
