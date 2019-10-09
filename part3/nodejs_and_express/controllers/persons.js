const personsRouter = require('express').Router();
const Person = require('../models/person');

personsRouter.get('/', (req, res) => {
    Person.find({}).then(persons => {
        persons.map(person => person.toJSON());
        res.json(persons);
    });
});

personsRouter.get('/:id', (req, res, next) => {
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

personsRouter.post('/', (req, res, next) => {
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

personsRouter.put('/:id', (req, res, next) => {
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

personsRouter.delete('/:id', (req, res, next) => {
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

personsRouter.get('/info', (req, res) => {
    const now = Date();
    Person.estimatedDocumentCount()
        .then(result => {
            res.send(`<div>Phonebook has info for ${result} people</div><div>${now}</div>`);
        });
});

module.exports = personsRouter;