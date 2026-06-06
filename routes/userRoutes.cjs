const express = require('express')
const { getAllUsers, getUser, register, updateUser, deleteUser, login, getMe } = require('../controllers/index.cjs')
const authentication  = require('../middleware/authenticationMiddleware.cjs')
const authorization = require('../middleware/authorizationMiddleware.cjs')
const userRoutes = express.Router()


    userRoutes.get('/', authentication, authorization(["admin"]), getAllUsers)
    
    userRoutes.get('/me', authentication, getMe )
    userRoutes.get('/:id',authentication, getUser)
    userRoutes.post('/register', register)
    userRoutes.post('/login', login)

    
    userRoutes.patch('/:id', authentication,  updateUser)
    userRoutes.delete('/:id', authentication, deleteUser)

module.exports = userRoutes

