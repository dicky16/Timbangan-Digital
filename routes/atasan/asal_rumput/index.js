const express = require('express');
const router = express.Router();
const c = require('./asal_rumput.controller')

router.get('/', c.asalRumput)
router.post('/', c.storeAsalRumput)
router.get('/del/:id', c.destroyAsalRumput)

module.exports = router