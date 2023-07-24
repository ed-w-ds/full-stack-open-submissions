const blogsRouter = require('express').Router()
const { error } = require('console')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
    })

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    if (!blog.title || !blog.url) {
        return response.status(400).end()
    }
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

})

module.exports = blogsRouter