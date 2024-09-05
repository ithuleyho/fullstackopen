import { useState } from "react";

const Filter = ({ setFilter }) => {
  return (
    <div>filter shown with <Input setter={setFilter}/></div>
  );
};

const Input = ({ value, setter }) => {
  const handler = (event) => {
    setter(event.target.value);
  };

  return (
    <input value={value} onChange={handler} />
  );
};

const PersonForm = ({ newEntry }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };
    if (newEntry(newPerson).succeeded) {
      setNewName('');
      setNewNumber('');
    }
  };
  
  return (
    <form>
      <h2>Add new entry</h2>
      <div>name: <Input value={newName} setter={setNewName} /></div>
      <div>number: <Input value={newNumber} setter={setNewNumber} /></div>
      <div>
        <button type="submit" onClick={addPerson}>add</button>
      </div>
    </form>
  );
};

const Persons = ({ filter, persons }) => {
  const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <>
      <h2>Numbers</h2>
      {filtered.map(person => (
        <p key={person.name}>{person.name} {person.number}</p>
      ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [filter, setFilter] = useState('');

  const newEntry = (newPerson) => {
    if (persons.find(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return {succeeded: false};
    }
    setPersons(persons.concat(newPerson));  
    return {succeeded: true};
  };
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <PersonForm newEntry={newEntry} />
      <Persons filter={filter} persons={persons} />
    </div>
  );
};

export default App
