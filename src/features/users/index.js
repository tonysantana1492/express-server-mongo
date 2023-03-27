const usersRouter = require('./router')
const usersController = require('./controller')
const usersModel = require('./model')
const usersRepository = require('./repository')

module.exports = {
  usersRouter,
  usersController,
  usersModel,
  usersRepository
}