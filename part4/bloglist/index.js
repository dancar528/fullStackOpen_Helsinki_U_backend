const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const mongoUrl = 'mongodb+srv://dcardoh:Mayo2018@nodejstdea-f8r7w.mongodb.net/helsinki_bloglist?retryWrites=true&w=majority'
const PORT = 3003

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const log = morgan('tiny');

console.log('connecting to mongoDB...')

mongoose.connect(mongoUrl, { useNewUrlParser: true })
    .then(result => {
        console.log('connected to mongoDB')
    })
    .catch(error => {
        console.log(error)
    });

app.use(cors())
app.use(log)
app.use(bodyParser.json())

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs);
        })
        .catch(error => {
            console.log(error)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(200).json(result);
        })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})