const express = require('express');
const router = express.Router();

router.use('/berat', require('./berat'));
router.use('/driver', require('./driver'));
router.use('/user', require('./user'))
router.use('/auth', require('./auth'))
router.use('/all', require('./all'))

module.exports = router