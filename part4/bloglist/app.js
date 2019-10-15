const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const config = require('./utils/config')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('connecting to mongoDB...')

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        logger.info('connected to mongoDB')
    })
    .catch(error => {
        logger.error('error connecting to MongoDB', error)
    })

app.use(cors())
app.use(middleware.requestLogger)
app.use(bodyParser.json())
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)

module.exports = app
