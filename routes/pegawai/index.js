const express = require('express');
const router = express.Router();
const c = require('./pegawai.controller')

router.get('/driver', c.driver)

module.exports = router