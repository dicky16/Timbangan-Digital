const express = require('express');
const router = express.Router();
const c = require('./truk.controller')

router.get('/', c.truk)
router.post('/', c.store)
router.get('/del/:id', c.destroy)

module.exports = router