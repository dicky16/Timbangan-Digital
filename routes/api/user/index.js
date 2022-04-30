const express = require('express');
const router = express.Router();
const c = require('./user.controller')

router.get('/:id', c.findById)

module.exports = router