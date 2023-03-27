const { notesRouter } = require('./notes')
const { usersRouter } = require('./users')
const { loginRouter } = require('./auth')

module.exports = {
  notesRouter,
  usersRouter,
  loginRouter
}
