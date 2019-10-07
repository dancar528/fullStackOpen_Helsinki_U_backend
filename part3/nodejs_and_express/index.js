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
const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' });
    }
    next(error);
};

app.use(express.static('build'));

app.use(bodyParser.json());

app.use(cors());

app.use(log);

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        persons.map(person => person.toJSON());
        res.json(persons);
    });
});

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findById(id).then(person => {
        if (person) {
            res.json(person.toJSON());
        } else {
            res.status(404).send({ error: `Doesn't exist person with id ${id}` });
        }
    })
    .catch(error => next(error));
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
    Person.estimatedDocumentCount()
        .then(result => {
            res.send(`<div>Phonebook has info for ${result} people</div><div>${now}</div>`);
        });
});

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const person = {
        number: body.number
    };

    if (!body.number) {
        return res.status(400).send({ error: 'number is not sent in the request' });
    }

    Person.findByIdAndUpdate(id, person, { new: true })
        .then(person => {
            if (person) {
                return res.status(200).send(person);
            } else {
                return res.status(404).send({ error: 'Person to update does not exist' });
            }
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findByIdAndRemove(id)
        .then(result => {
            if (result) {
                res.status(204).end();
            } else {
                res.status(404).send({ error: `Doesn't exist person with id ${id}` });
            }
        })
        .catch(error => next(error));
});

// handler of requests with result to errors
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server listen on port ${PORT}`);
});
