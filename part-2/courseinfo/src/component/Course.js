import React from 'react'

const Course = ({course}) => {
    const total = course.parts.reduce((total, cursum) => { return total + cursum.exercises
    }, 0)
    return (
      <>
      <h1>{course.name}</h1>
      {course.parts.map(info => <p key={info.id}>{info.name} {info.exercises}</p>)}
      <strong>total of {total} exercises</strong>
      </>
    )
  }

  export default Course