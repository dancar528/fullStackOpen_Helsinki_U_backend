const express = require('express');
const app = express();
const PORT = 3001;
const persons = [
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

app.get('/info', (req, res) => {
    const now = Date();
    res.send(`<div>Phonebook has info for ${persons.length} people</div>
    <div>${now}</div>`);
});

app.listen(PORT, () => {
    console.log(`server listen on port ${PORT}`);
});
