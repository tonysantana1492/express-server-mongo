const express = require('express');
const app = express();
const cors = require('cors');
const { notesRouter, usersRouter, loginRouter } = require('./features');
const { errorHandler } = require('./middlewares');

const corsOptions = {
  origin: '*',
};

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(errorHandler.requestLogger);

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(errorHandler.unknownEndpoint);
app.use(errorHandler.errorHandler);

module.exports = app;
