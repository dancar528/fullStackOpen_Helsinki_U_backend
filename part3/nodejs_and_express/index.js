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
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name && error.name.name === 'ValidatorError' && error.name.kind === 'unique') {
        return res.status(409).send({ error: error.name.message });
    } else if (error.name && error.name.name === 'ValidatorError' && error.name.kind === 'minlength') {
        return res.status(409).send({ error: error.name.message });
    } else if (error.number && error.number.name === 'ValidatorError' && error.number.kind === 'minlength') {
        return res.status(409).send({ error: error.number.message });
    } else if (error.status && error.message) {
        return res.status(error.status).send({ error: error.message });
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
            const error = {
                status: 404,
                message: 'Person doesn\'t exist'
            };
            next(error);
        }
    })
    .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
    const body = req.body;
    const name = body.name.trim();
    let error = {};

    if (!name) {
        error = {
            status: 400,
            message: 'Name is missing'
        };
        next(error);
    }
    if (!body.number) {
        error = {
            status: 400,
            message: 'Number is missing'
        };
        next(error);
    }

    const person = new Person({
        name: name,
        number: body.number
    });

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON());
    })
    .catch(error => {
        next(error.errors)
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
    let error = {};

    if (!body.number) {
        error = {
            status: 400,
            message: 'number is missing'
        };
        next(error);
    }
    // runCalidators to validate the name as unique and
    // the name and number correct length fields
    Person.findByIdAndUpdate(id, person, {
        new: true,
        runValidators: true,
        context: 'query'
    })
        .then(person => {
            if (person) {
                return res.status(200).send(person);
            } else {
                error = {
                    status: 404,
                    message: 'Person to update does not exist'
                };
                next(error);
            }
        })
        .catch(error => {
            if (error.errors) {
                // apply for validatorError. i.e. unique, minlength
                next(error.errors)
            } else {
                // apply for castError i.e. malformatted id
                next(error)
            }
        });
});

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findByIdAndRemove(id)
        .then(result => {
            if (result) {
                res.status(204).end();
            } else {
                const error = {
                    status: 404,
                    message: 'Person to delete does not exist'
                };
                next(error);
            }
        })
        .catch(error => next(error));
});

// handler of requests with result to errors
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server listen on port ${PORT}`);
});
