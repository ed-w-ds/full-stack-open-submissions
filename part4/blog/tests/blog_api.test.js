const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

// supertest takes care that the application being tested is started at the port it uses internally
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
        url: 'https://en.wikipedia.org/wiki/Crime_and_Punishment',
        likes: 10
    }

    // check if the blog is added to the database
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201) // 201 means Created
        .expect('Content-Type', /application\/json/)
        // console.log('newBlog', newBlog)
    
    // verify that the number of blogs have increased by one
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    // verify that the title of the new blog is in the list of blogs
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Crime and Punishment')
    // verify that the author of the new blog is in the list of blogs
    const authors = blogsAtEnd.map(b => b.author)
    expect(authors).toContain('Fyodor Dostoevsky')
    // verify that the url of the new blog is in the list of blogs
    const urls = blogsAtEnd.map(b => b.url)
    expect(urls).toContain('https://en.wikipedia.org/wiki/Crime_and_Punishment')
    // verify that the likes of the new blog is in the list of blogs
    const likes = blogsAtEnd.map(b => b.likes)
    expect(likes).toContain(10)
})

afterAll(() => {
    mongoose.connection.close()
})