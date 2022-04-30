const express = require('express');
const router = express.Router();
const c = require('./user.controller')

router.get('/', c.user)

module.exports = router