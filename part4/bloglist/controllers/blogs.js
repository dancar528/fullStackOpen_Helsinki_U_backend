const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (error) {
        logger.error('error getting the blogs', error)
    }
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    try {
        const result = await blog.save()
        response.status(200).json(result)
    } catch (error) {
        logger.error('error saving the blog', error)
    }
})

module.exports = blogRouter
