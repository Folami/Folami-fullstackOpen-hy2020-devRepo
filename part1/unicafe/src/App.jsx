import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const DisplayPercent = (props) => (
  <p>
    {props.text} {(props.dec * 100).toFixed(14)} %
  </p>
)

const StatisticLine = (props) => (
  <>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </>
)

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tr>
          <StatisticLine text="good" value={props.good} />
        </tr>
        <tr>
          <StatisticLine text="neutral" value={props.neutral} />
        </tr>
        <tr>
          <StatisticLine text="bad" value={props.bad} />
        </tr>
        <tr>
          <StatisticLine text="all" value={props.total} />
        </tr>
        <tr>
          <StatisticLine text="average" value={props.average} />
        </tr>
        <tr>
          <StatisticLine
            text="positive"
            value={`${(props.positive * 100).toFixed(14)} %`}
          />
        </tr>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    const updatedTotal = updatedGood + neutral + bad
    const updatedAverage = (updatedGood - bad) / updatedTotal
    const updatedPositive = updatedGood / updatedTotal
    setGood(updatedGood)
    setTotal(updatedTotal)
    setAverage(updatedAverage)
    setPositive(updatedPositive)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = good + updatedNeutral + bad
    const updatedAverage = (good - bad) / updatedTotal
    const updatedPositive = good / updatedTotal
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
    setAverage(updatedAverage)
    setPositive(updatedPositive)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    const updatedTotal = good + neutral + updatedBad
    const updatedAverage = (good - updatedBad) / updatedTotal
    const updatedPositive = good / updatedTotal
    setBad(updatedBad)
    setTotal(updatedTotal)
    setAverage(updatedAverage)
    setPositive(updatedPositive)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App
