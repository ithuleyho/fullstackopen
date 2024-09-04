import { useState } from "react";

const Button = ({ label, handler }) => {
  return (
    <button onClick={handler}>
      {label}
    </button>
  );
};

const Stat = ({ label, n }) => {
  return (
    <p>{label}: {n}</p>
  );
};

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
      <Stat label="good" n={good} />
      <Stat label="neutral" n={neutral} />
      <Stat label="bad" n={bad} />
    </div>
  );
};

export default App
