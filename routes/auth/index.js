const express = require('express');
const router = express.Router();
const c = require('./auth.controller')
const m = require('../../middleware/cek.login')

router.get('/', function (req, res) {
    var session = req.cookies
    var login = session.login
    if(login === 'true') {
        res.redirect('home')
    } else {
        res.render('pages/login', { error: req.flash('error')})
    }
});
router.post('/',  c.login)
router.get('/logout', c.logout)

module.exports = router