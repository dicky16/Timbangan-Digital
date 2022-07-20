/* eslint-disable new-cap */
const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const m = require('../middleware/cek.login')
const mRole = require('../middleware/cek.role')

router.use('/api', require('./api'));
router.use('/auth', require('./auth'));

//home route
router.use('/home', m.cekLogin,  require('./home'))
router.use('/profile/', m.cekLogin, require('./profile'))

// router.use('/', m.cekLogin,  require('./atasan'))
router.use('/report', m.cekLogin,  require('./atasan/report'))
router.use('/email', m.cekLogin,  require('./atasan/email'))
router.use('/user', [m.cekLogin, mRole.cekRoleSuperadmin],  require('./atasan/user'))
router.use('/jenis-rumput', [m.cekLogin, mRole.cekRoleSuperadmin],  require('./atasan/jenis_rumput'))
router.use('/asal-rumput', [m.cekLogin, mRole.cekRoleSuperadmin],  require('./atasan/asal_rumput'))
router.use('/truk', [m.cekLogin, mRole.cekRoleSuperadmin],  require('./atasan/truk'))

router.use('/driver/', m.cekLogin,  require('./pegawai/'))

router.use('/', function(req, res) {
    res.render('landing/index')
})

module.exports = router;
