const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { usersRepository, usersController } = require('../users')
const config= require('../../config')

const login = async (request, response) => {
  const body = request.body

  const user = await usersRepository.findUserByUserName(body.username)
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, config.TOKEN)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
}

const register = async (request, response) => {
  return await usersController.createUser(request, response)
}

module.exports = {
  login,
  register,
}
