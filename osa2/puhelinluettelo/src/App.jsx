import { useEffect, useState } from "react";
import personService from './services/persons';
import Input from './Input';
import PersonForm from "./PersonForm"; 
import Filter from "./Filter"; 
import Persons from "./Persons"; 
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  const notify = (message, kind = 'success', timeout = 5000) => {
    setNotification({message, kind});
    setTimeout(() => {
      setNotification(null);
    }, timeout);
  };

  const error = args => notify(...args, kind = 'error');
  
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
          notify(`Updated number for ${person.name}`);
        });

      return;
    }
    personService.create(newPerson)
      .then(returnedData => {
        setPersons(persons.concat(returnedData));  
        clearValues();
        notify(`Added ${returnedData.name}`);
      })
  };

  const deleteEntry = entry => {
    if(confirm(`Delete ${entry.name}?`)) {
      personService.remove(entry.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== entry.id));
          notify(`Deleted ${entry.name}`);
        });
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
