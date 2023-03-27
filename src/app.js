const express = require('express')
const app = express()
const cors = require('cors')
const { notesRouter, usersRouter, loginRouter } = require('./features')
const middleware = require('./utils/middleware')

const corsOptions = {
  origin: '*',
}

app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
