const notesRouter = require('./router')
const notesController = require('./controller')
const notesModel = require('./model')
const notesRepository = require('./repository')

module.exports = {
  notesRouter,
  notesController,
  notesModel,
  notesRepository
}