const bcrypt = require('bcrypt');
const { usersRepository } = require('./repository');

const getAllUsers = async (request, response) => {
  const users = await usersRepository.getAllUsers();
  response.json(users);
};

const createUser = async (request, response) => {
  const { username, name, password } = request.body;

  const existingUser = await usersRepository.findUserByUserName( username );
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const savedUser = await usersRepository.createUser({
    username,
    name,
    passwordHash,
  });

  response.status(201).json(savedUser);
};

module.exports = {
  getAllUsers,
  createUser
};