const Input = ({ value, setter }) => {
  const handler = (event) => {
    setter(event.target.value);
  };

  return (
    <input value={value} onChange={handler} />
  );
};

export default Input;
