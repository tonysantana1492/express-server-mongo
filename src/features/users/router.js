const { Router } = require('express')
const { getAllUsers } = require('./controller')

const router = Router()

router.get('/', getAllUsers)

module.exports = router