const router = require('express').Router()
const { getNoteById, getAllNotes, createNote, deleteNote, updateNote } = require('./controller')

router.get('/', getAllNotes)

router.get('/:id', getNoteById)

router.post('/', createNote)

router.delete('/:id', deleteNote)

router.put('/:id', updateNote)

module.exports = router