const express = require('express');
const router = express.Router();
const c = require('./user.controller')

router.get('/', c.user)
router.post('/', c.store)
router.get('/:id', c.edit)
router.post('/:id', c.update)

module.exports = router