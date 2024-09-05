import { useEffect, useState } from "react";
import personService from './services/persons';

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

  const clearValues = () => {
    setNewName('');
    setNewNumber('');
  };
  
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };
    newEntry(newPerson, clearValues);
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

const Persons = ({ filter, persons, handleDelete }) => {
  const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <>
      <h2>Numbers</h2>
      {filtered.map(person => (
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person)}>
            delete
          </button>
        </div>
      ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

  const loadPersons = useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  const newEntry = (newPerson, clearValues) => {
    if (persons.find(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
    personService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data));  
        clearValues();
      })
  };

  const deleteEntry = entry => {
    if(confirm(`Delete ${entry.name}?`)) {
      personService.remove(entry.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== entry.id));
        });
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <PersonForm newEntry={newEntry} />
      <Persons 
        filter={filter} 
        persons={persons} 
        handleDelete={deleteEntry} />
    </div>
  );
};

export default App
