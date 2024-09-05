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
  console.log(persons);
  const filtered = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <>
      <h2>Numbers</h2>
      {filtered.map(person => (
        <div key={person.id}>
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
      .then(data => {
        setPersons(data);
      });
  }, []);

  const newEntry = (newPerson, clearValues) => {
    const person = persons.find(p => p.name === newPerson.name);
    if (person) {
      if(!confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        return;
      }

      personService.update(person.id, {...newPerson})
        .then(returnedData => {
          const newPersons = persons.map(p => {
            if (person.id == p.id) {
              return returnedData;
            } else {
              return p;
            }
          });
          setPersons(newPersons);
        });

      return;
    }
    personService.create(newPerson)
      .then(returnedData => {
        setPersons(persons.concat(returnedData));  
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
