const Persons = ({ filter, persons, handleDelete }) => {
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

export default Persons;
