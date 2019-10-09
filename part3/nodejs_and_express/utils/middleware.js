const morgan = require('morgan');

const requestLogger = morgan(
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

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
    requestLogger,
    errorHandler,
    unknownEndpoint
};