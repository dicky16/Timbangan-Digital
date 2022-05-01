const db = require("../../config/db")
const bcrypt = require('bcryptjs')

exports.login = async (req, res, next) => {
    try {
        var email = req.body.email
        var password = req.body.password
        const query = "SELECT * FROM user WHERE email = ?"
        db.query(query, [email], (err, results) => {
            if (err) throw err
            if (results.length > 0) {
                bcrypt.compare(password, results[0]['password'], function (error, result) {
                    // console.log(result)
                    if (result) {
                        // req.session.login = true
                        // req.session.id = results[0]['id']
                        // req.session.nama = results[0]['nama']
                        res.cookie('login', 'true')
                        res.cookie('id', results[0]['id'])
                        res.cookie('nama', results[0]['nama'])
                        res.cookie('role', results[0]['role'])
                        res.cookie('gambar', results[0]['gambar'])
                        res.redirect('home')
                    } else {
                        req.flash('error', 'Username atau Password salah');
                        res.redirect('auth')
                    }
                })
            } else {
                req.flash('error', 'Username atau Password salah');
                res.redirect('auth')
            }
        })
    } catch (error) {
        console.log('gagal')
        res.redirect('auth')
    }
}

exports.logout = async (req, res, next) => {
    res.cookie('login', false)
    res.cookie('nama', "")
    res.cookie('role', "")
    res.cookie('id', "")
    res.redirect('/auth')
}
