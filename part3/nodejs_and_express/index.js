const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const PORT = 3001;
let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
];
const log = morgan(
    //':method :url :status :res[content-length] - :response-time ms',
    (tokens, req, res) => {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            JSON.stringify(req.body)
        ].join(' ')
});

app.use(bodyParser.json());

app.use(log);

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        res.json(person);
    } else {
        res.status(404).send({ error: `Doesn't exist person with id ${id}` });
    }
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    const name = body.name.trim();

    if (!name) {
        return res.status(400).send({ error: 'Name missing' });
    }
    if (!body.number) {
        return res.status(400).send({ error: "Number missing" });
    }

    const person = persons.find(person =>
        person.name.trim().toLowerCase() === name.toLowerCase()
    );
    if (person) {
        return res.status(409).send({ error: 'Name must be unique' });
    }
    const id = Math.floor(Math.random() * Math.floor(1000));
    const newPerson = {
        id: id,
        name: body.name,
        number: body.number
    };
    persons = persons.concat(newPerson);
    res.json(newPerson);
});

app.get('/info', (req, res) => {
    const now = Date();
    res.send(`<div>Phonebook has info for ${persons.length} people</div>
    <div>${now}</div>`);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        persons = persons.filter(person => person.id !== id);
        res.status(204).end();
    } else {
        res.status(404).send({ error: `Doesn't exist person with id ${id}` });
    }
});

app.listen(PORT, () => {
    console.log(`server listen on port ${PORT}`);
});
