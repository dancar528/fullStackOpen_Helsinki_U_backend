const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are four blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(4)
})

test('the first blog is about Type wars', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].title).toBe('Type wars')
})

afterAll(() => {
    mongoose.connection.close()
})