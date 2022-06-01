const router = require('express').Router()
const verifyUser = require('../../middleware/verify')
const c = require('./profile.controller')

router.get('/', c.profile)
router.post('/', c.update)
// router.get('/profileEdit/:id', c.EditProfile)
// router.post('/profileUpdate/:id', c.UpdateProfile)

module.exports = router