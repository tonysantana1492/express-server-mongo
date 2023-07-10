
const jwt = require('jsonwebtoken');
const Note = require('./model');
const User = require('../users/model');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

const getNoteById = async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note.toJSON());
  } else {
    response.status(404).end();
  }
};

const getAllNotes = async (request, response) => {
  const notes = await Note
    .find({}).populate('user', { username: 1, name: 1 });

  response.json(notes);
};

const createNote = async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date(),
    user: user._id
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.status(201).json(savedNote);
};

const deleteNote = async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
};

const updateNote = (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote);
    })
    .catch(error => next(error));
};

module.exports = {
  getNoteById,
  getAllNotes,
  createNote,
  updateNote,
  deleteNote
};