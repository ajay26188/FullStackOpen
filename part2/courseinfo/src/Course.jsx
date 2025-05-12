const Course = (props) => {
    //console.log(props)
    const {courses} = props
    return (
      courses.map(course =>
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total exercise={course.parts} />
        </div>
    )
    )
  }
  
  const Header = (props) => {
    return(
      <div>
      <h3>{props.name}</h3>
      </div>
    )
  }
  
  const Content = (props) => {
    //console.log(props)
    const {parts} = props
    return (
      <div> 
        {parts.map (content => <Part key={content.id} part={content} />)}
      </div>
    )
  }
  
  const Part = (props) => {
    //console.log(props)
    return (
      <div>
        <p>{props.part.name} {props.part.exercises}</p>
      </div>
    )
  }
  
  const Total = (props) => {
    const {exercise} = props
    //creating a new array of exercises 
    const newArray = exercise.map(element => element.exercises)
    //console.log(newArray)
  
    const total = newArray.reduce((s, p) =>  s+p 
    )
  
    return (
      <div>
        <h4>total of {total} exercises</h4>
      </div>
    )
  }

  export default Course