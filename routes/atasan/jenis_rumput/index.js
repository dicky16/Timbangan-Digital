const express = require('express');
const router = express.Router();
const c = require('./jenis_rumput.controller')

router.get('/', c.jenisRumput)
router.post('/', c.storeJenisRumput)
router.get('/del/:id', c.destroyJenisRumput)

module.exports = router