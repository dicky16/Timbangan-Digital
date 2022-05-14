const req = require("express/lib/request")
const db = require("../../config/db")
const bcrypt = require('bcryptjs')
const fs = require("fs")

exports.profile = async (req, res, next) => {
    try {
        // let id = req.params.id;

        var id = req.cookies.id
        const query = "SELECT * FROM user WHERE id = ?"
        db.query(query, id, (err, results) => {
            if (err) throw err
            res.render('profile', {
                data: results[0],
                error: req.flash('error')
            })
        })
    } catch (error) {
        console.log(error)
    }
}

exports.update = async (req, res) => {
    try {
        if (req.body.new_password != '' && req.body.password_confirmation != '') {
            var data = { ...req.body }
            if (data.new_password == data.password_confirmation) {
                var id = req.cookies.id
                var salt = bcrypt.genSaltSync(10);
                var password = bcrypt.hashSync(req.body.new_password, salt)
                data = {
                    nama: req.body.nama,
                    no_tlp: req.body.no_tlp,
                    password: password
                }
                const query = "UPDATE user SET ? WHERE id = ?"
                var id = req.cookies.id
                db.query(query, [data, id], (err, results) => {
                    if (err) throw err
                    res.redirect('/profile')
                })
            } else {
                // console.log("error error")
                req.flash('error', 'Password harus sama')
                res.redirect('/profile')
            }
        } else {
            var data
            let gambar;
            let uploadPath;
            let path
            if (!req.files || Object.keys(req.files).length === 0) {
                data = {
                    nama: req.body.nama ?? '',
                    no_tlp: req.body.no_tlp ?? ''
                }
            } else {
                gambar = req.files.gambar;
                path = "public/uploads/image/" + Date.now() + '-' + gambar.name
                uploadPath = './static/' + path

                gambar.mv(uploadPath, function (err) {
                    if (err) {
                        req.flash('error', 'gagal update, coba lagi' + err)
                    }
                });
                data = {
                    nama: req.body.nama ?? '',
                    no_tlp: req.body.no_tlp ?? '',
                    gambar: path
                }
                res.cookie('gambar', data.gambar)
            }
            const query = "SELECT * FROM user WHERE id = ?; UPDATE user SET ? WHERE id = ?"
            var id = req.cookies.id

            db.query(query, [id, data, id], (err, results) => {
                if (err) throw err
                if (gambar) {
                    if (results[0][0].gambar) {
                        fs.unlinkSync("static/" + results[0][0].gambar)
                    }
                }
                res.cookie('nama', data.nama)
                return res.redirect('/profile')
            })

        }
    } catch (error) {
        console.log(error)
    }
}

exports.landing = async (req, res) => {
    res.render('landing/index')
}

// exports.login = async (req, res, next) => {
//     try {
//         var email = req.body.email
//         var password = req.body.password
//         const query = "SELECT * FROM user WHERE email = ?"
//         db.query(query, [email], (err, results) => {
//             if(err) throw err
//             if(results.length > 0) {
//                 bcrypt.compare(password, results[0]['password'], function(error, result) {
//                     // console.log(result)
//                     if(result) {
//                         // req.session.login = true
//                         // req.session.id = results[0]['id']
//                         // req.session.nama = results[0]['nama']
//                         res.cookie('login', true)
//                         res.cookie('nama', results[0]['nama'])
//                         res.cookie('role', results[0]['role'])
//                         res.redirect('home')
//                         // console.log(req.cookies)
//                         // res.redirect('home')
//                     } else {
//                         req.flash('error', 'Username atau Password salah');
//                         res.redirect('auth')
//                     }
//                 })
//             } else {
//                 req.flash('error', 'Username atau Password salah');
//                 res.redirect('auth')
//             }
//         })
//     } catch (error) {
//         res.redirect('ok')
//     }
// }
