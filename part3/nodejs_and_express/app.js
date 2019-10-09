const config = require('./utils/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const personsRouter = require('./controllers/persons');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

console.log('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });

app.use(express.static('build'));

app.use(bodyParser.json());

app.use(cors());

app.use(middleware.requestLogger);

app.use('/api/persons', personsRouter);

app.use(middleware.unknownEndpoint);

// handler of requests with result to errors
app.use(middleware.errorHandler);

module.exports = app;