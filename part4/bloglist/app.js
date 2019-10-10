const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const blogRouter = require('./controllers/blogs')
const config = require('./utils/config')
const mongoose = require('mongoose')

console.log('connecting to mongoDB...')

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true })
    .then(result => {
        console.log('connected to mongoDB')
    })
    .catch(error => {
        console.log(error)
    });

const log = morgan('tiny');

app.use(cors())
app.use(log)
app.use(bodyParser.json())
app.use('/api/blogs', blogRouter)

module.exports = app