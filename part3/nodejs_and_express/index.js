const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const url = `mongodb+srv://dcardoh:password@nodejstdea-f8r7w.mongodb.net/fullstack_Helsinki_U?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 3001;
let persons = [];
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
const personSchema = new mongoose.Schema({
    name: String,
    number: String
});
const Person = new mongoose.model('Person', personSchema);
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

app.use(cors());

app.use(bodyParser.json());

app.use(log);

app.use(express.static('build'));

mongoose.connect(url, { useNewUrlParser: true });

Person.find({}).then(result => {
    persons = result.map(person => person.toJSON());
});

app.get('/api/persons', (req, res) => {
    res.json(persons);
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
