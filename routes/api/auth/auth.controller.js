const db = require("../../../config/db")
const bcrypt = require('bcryptjs')

exports.findAll = async (req, res, next) => { 
    try {
        const query = "SELECT * FROM user WHERE email = ? AND password = ?"
        db.query(query, [email, password], (err, results) => {
            res.json({
                status: "success",
                length: results[0],
                data: results[1],
            })
        })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        var email = req.body.email
        var password = req.body.password
        const query = "SELECT * FROM user WHERE email = ?"
        db.query(query, [email], (err, results) => {
            if(err) throw err
            if(results.length > 0) {
                bcrypt.compare(password, results[0]['password'], function(error, result) {
                    // console.log(result)
                    if(result) {
                        res.json({
                            status: "success",
                            data: results[0]
                        })
                    } else {
                        res.json({
                            status: "error",
                            msg: "Username atau Password salah"
                        })
                    }
                })
            } else {
                res.json({
                    status: "error",
                    msg: "Username atau Password salah"
                })
            }
        })
    } catch (error) {
        res.json({
            status: "error",
            msg: error
        })
    }
}