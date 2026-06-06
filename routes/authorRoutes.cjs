const express = require('express')
const {getAuthor, getAuthors, addAuthor, updateAuthor, deleteAuthor } = require('../controllers/index.cjs')


const authorRoutes = express.Router()

authorRoutes.get('/', getAuthors)
authorRoutes.get('/:id', getAuthor)
authorRoutes.post('/', addAuthor)
authorRoutes.patch('/:id', updateAuthor)
authorRoutes.delete('/:id', deleteAuthor)

module.exports = authorRoutes