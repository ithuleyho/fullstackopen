import { useState } from "react";

const Button = ({ label, handler }) => {
  return (
    <button onClick={handler}>
      {label}
    </button>
  );
};

const StatisticsLine = ({ text, n }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{n}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const percentPositive = good / all * 100;

  if (all === 0) {
    return (
      <p>No feedback given</p>
    );
  }
  
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" n={good} />
        <StatisticsLine text="neutral" n={neutral} />
        <StatisticsLine text="bad" n={bad} />
        <StatisticsLine text="all" n={all} />
        <StatisticsLine text="average" n={average} />
        <StatisticsLine text="positive" n={percentPositive + " %"} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button label="good" handler={() => setGood(good + 1)}/>
      <Button label="neutral" handler={() => setNeutral(neutral + 1)}/>
      <Button label="bad" handler={() => setBad(bad + 1)}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App
