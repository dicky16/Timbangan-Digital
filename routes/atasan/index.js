/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const m = require('../../middleware/cek.login')
const mRole = require('../../middleware/cek.role')

router.use('/report', m.cekLogin,  require('./report'))
router.use('/email', m.cekLogin,  require('./email'))
router.use('/user', [m.cekLogin, mRole.cekRoleSuperadmin],  require('./user'))

module.exports = router;
