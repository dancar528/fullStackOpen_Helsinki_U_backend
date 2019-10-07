require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const PORT = process.env.PORT || 3001;
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

app.use(cors());

app.use(bodyParser.json());

app.use(log);

app.use(express.static('build'));

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        persons.map(person => person.toJSON());
        res.json(persons);
    });
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
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

    /*let person = persons.find(person =>
        person.name.trim().toLowerCase() === name.toLowerCase()
    );
    if (person) {
        return res.status(409).send({ error: 'Name must be unique' });
    }*/

    const person = new Person({
        name: name,
        number: body.number
    });

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON());
    });
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
