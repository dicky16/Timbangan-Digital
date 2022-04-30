/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const m = require('../middleware/cek.login')

router.use('/api', require('./api'));
router.use('/auth', require('./auth'));

//home route
router.use('/home', m.cekLogin,  require('./home'))
router.use('/', m.cekLogin, require('./profile'))
router.use('/', m.cekLogin,  require('./atasan'))
router.use('/', m.cekLogin,  require('./pegawai/'))

module.exports = router;
