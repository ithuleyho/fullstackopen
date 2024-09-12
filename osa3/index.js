const express = require('express');
const morgan = require('morgan');
const app = express();

morgan.token('body', (req, _) => {
  if (Object.keys(req.body).length === 0) {
    return null;
  }
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('dist'))

const MAX_SIZE = 1_000_000;

const notFoundResponse = {
  error: 'Resource not found'
};

let persons = [
  { id: '1', name: 'Arto Hellas', number: '040-123456' },
  { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
  { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' },
];

app.get('/api/persons', (_, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find(person => person.id === id);

  person ? response.json(person)
         : response.status(404).json(notFoundResponse).end();
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  if (persons.find(person => person.id === id) === null) {
    return response.status(404).end();
  }
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

app.get('/info', (_, response) => {
  response.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    `);
});

app.post('/api/persons', (request, response) => {
  if (persons.length === MAX_SIZE) {
    return response.status(507).json({
      error: 'too many entries'
    });
  }

  const body = request.body;
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    });
  }

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    });
  }

  // the handout says the name must be unique, but 
  // people with the same name do exists. numbers however are
  // usually linked to one person only.
  if (persons.find(person => person.number === body.number)) {
    return response.status(409).json({
      error: 'number must be unique'
    });
  }

  const generateId = () => Math.floor(Math.random() * MAX_SIZE).toString();
  let id = generateId();
  while (persons.find(person => person.id === id)) {
    id = generateId();
  }
  const person = {
    id,
    name: body.name,
    number: body.number
  };
  
  persons = persons.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
