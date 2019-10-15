const morgan = require('morgan')
const logger = require('./logger')

const requestLogger = morgan((tokens, req, res) => {
    const log = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
    logger.info(log)
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
    requestLogger,
    unknownEndpoint
}
