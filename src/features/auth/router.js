const { login, register } = require('./controller');

const router = require('express').Router();

router.post('/', login);

router.post('/', register);

module.exports = router;