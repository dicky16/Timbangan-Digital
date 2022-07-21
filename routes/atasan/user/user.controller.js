const db = require("../../../config/db")
const bcrypt = require('bcryptjs')

exports.user = async (req, res, next) => {
    try {
        const query = "SELECT * FROM user"
        db.query(query, (err, results) => {
            if (err) throw err
            if (results.length > 0) {
                res.render('atasan/user', {
                    data: results
                })
            } else {
                req.flash('error_data', 'Gagal ambil data, coba lagi')
                res.render('atasan/user', { data: results })
            }
        })
    } catch (error) {
        console.log("error " + error)
    }
}

exports.store = async (req, res, next) => {

    var password = bcrypt.hashSync(req.body.password, 10)
    const data = {
        password: password,
        nama: req.body.nama,
        email: req.body.email,
        no_tlp: req.body.no_tlp
    }
    try {
        const query = "INSERT INTO user SET ?"
        db.query(query, data, (err, results) => {
            if (err) throw err
            res.redirect('/user')
        })
    } catch (error) {
        console.log("error " + error)
    }
}

exports.edit = async (req, res, next) => {
    var id = req.params.id
    try {
        const query = "SELECT * FROM user WHERE id = ?"
        db.query(query, id, (err, results) => {
            console.log(results)
            if (err) throw err
            if (results.length > 0) {
                res.json({
                    status: "success",
                    data: results[0],
                })
            }
            // else {
            //     res.json({
            //         status: "success",
            //         data: results,
            //     })
            // }
        })
    } catch (error) {
        console.log("error " + error)
    }
}

exports.update = async (req, res, next) => {
    var id = req.params.id
    var data = {}
    console.log(req.body.password)
    if (req.body.password != null) {
        var password = bcrypt.hashSync(req.body.password, 10)
        data = {
            password: password,
            nama: req.body.nama,
            email: req.body.email,
            no_tlp: req.body.no_tlp
        }
    } else {
        data = {
            nama: req.body.nama,
            email: req.body.email,
            no_tlp: req.body.no_tlp
        }
    }
    try {
        const query = "UPDATE user SET ? WHERE id = ?"
        db.query(query, [data, id], (err, results) => {
            if (err) throw err
            res.json({
                status: "success",
                data: "",
            })
        })
    } catch (error) {
        console.log("error " + error)
    }
}