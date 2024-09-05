import { useState } from 'react';
import Input from './Input';

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

export default PersonForm;
