
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

export default Course;
