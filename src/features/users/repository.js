const User = require('./model')

const getAllUsers = async () => {
  return await User.find({}).populate('notes', { content: 1, date: 1 })
}

const findUserByUserName = async ( username ) => {
  return await User.findOne({ username })
}

const createUser = async (data) => {

  const user = new User(data)

  return await user.save()
}

module.exports = {
  getAllUsers,
  findUserByUserName,
  createUser
}