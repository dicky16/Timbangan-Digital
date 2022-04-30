const router = require('express').Router()
const verifyUser = require('../../middleware/verify')
const c = require('./profile.controller')

router.get('/profile', c.profile)
router.post('/profile', c.update)
// router.get('/profileEdit/:id', c.EditProfile)
// router.post('/profileUpdate/:id', c.UpdateProfile)

module.exports = router