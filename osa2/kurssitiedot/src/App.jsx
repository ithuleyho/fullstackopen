const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  );
};

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => 
        <Part part={part} />
      )}
    </>
  );
};

const Total = ({parts}) => {
  const sum = parts.reduce((acc, curr) => acc + curr.exercises, 0);
  return (
    <p>
      Number of exercises {sum}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );  
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {name: 'Fundamentals of React', exercises: 10, id: 1},
      {name: 'Using props to pass data', exercises: 7, id: 2},
      {name: 'State of a component', exercises: 14, id: 3},
    ]
  };
  
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
