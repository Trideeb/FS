import React, { useState } from 'react'

const Statistics = (props) => {
  if(props.name === 'Positive') {
    return <td>{props.name} {props.value} %</td>
  }
  return <td>{props.name} {props.value}</td>
}

const Button = (props) => {
  return <button onClick={props.setValue}>{props.name}</button>
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button setValue={() => setGood(good + 1)} name='Good' />
      <Button setValue={() => setNeutral(neutral + 1)} name='Neutral' />
      <Button setValue={() => setBad(bad + 1)} name='Bad' />
      <h2>Statistics</h2>
      {good + bad + neutral === 0 &&
        <p>No feedback given</p>
      }

      {good + bad + neutral > 0 &&
        <table>
          <tbody>
          <tr>
            <Statistics name='Good' value={good} />
          </tr>
          <tr>
            <Statistics name='Neutral' value={neutral} />
          </tr>
          <tr>
            <Statistics name='Bad' value={bad} />
          </tr>
          <tr>
            <Statistics name='Average' value={good + bad + neutral} />
          </tr>
          <tr>
            <Statistics name='Positive' value={good * 100 / (good + bad + neutral)} />
          </tr>
          </tbody>
        </table>
      }
    </div>
  )
}

export default App