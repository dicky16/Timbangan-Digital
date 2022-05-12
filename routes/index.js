/* eslint-disable new-cap */
const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const m = require('../middleware/cek.login')

router.use('/api', require('./api'));
router.use('/auth', require('./auth'));

//home route
// router.use('/', function(req, res) {
//     res.render('landing/index')
// })
router.use('/home', m.cekLogin,  require('./home'))
router.use('/', m.cekLogin, require('./profile'))
router.use('/', m.cekLogin,  require('./atasan'))
router.use('/', m.cekLogin,  require('./pegawai/'))
router.use('/', require('./page'))

module.exports = router;
