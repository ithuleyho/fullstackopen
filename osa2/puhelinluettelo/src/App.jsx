import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterInput = (event) => {
    setFilter(event.target.value);
  };

  const newEntry = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };
    if (persons.find(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
    setPersons([newPerson, ...persons]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input onChange={handleFilterInput}/></div>
      <h2>Add new entry</h2>
      <form>
        <div>name: <input onChange={handleNameInput} /></div>
        <div>number: <input onChange={handleNumberInput} /></div>
        <div>
          <button type="submit" onClick={newEntry}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()))
        .map(person => (
          <p key={person.name}>{person.name} {person.number}</p>
      ))}
    </div>
  );
};

export default App
