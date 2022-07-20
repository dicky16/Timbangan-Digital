const db = require("../../../config/db")

exports.jenisRumput = async (req, res, next) => {
    try {
        const query = "SELECT * FROM jenis_rumput"
        db.query(query, (err, results) => {
            if (err) throw err
            if (results.length > 0) {
                res.render('atasan/jenisRumput', {
                    data: results
                })
            } else {
                req.flash('error_data', 'Gagal ambil data, coba lagi')
                res.render('atasan/jenisRumput', { data: results })
            }
        })
    } catch (error) {
        console.log("error " + error)
    }
}

exports.storeJenisRumput = async (req, res, next) => {
    const data = {
        jenis_rumput: req.body.jenis_rumput
    }
    try {
        const query = "INSERT INTO jenis_rumput SET ?"
        db.query(query, data, (err, results) => {
            if (err) throw err
            res.redirect('/jenis-rumput')
        })
    } catch (error) {
        console.log("error " + error)
    }
}

exports.destroyJenisRumput = async (req, res, next) => {
    var id = req.params.id
    try {
        const query = "DELETE FROM jenis_rumput WHERE id=" + id
        db.query(query, (err, results) => {
            if (err) throw err
            res.redirect('/jenis-rumput')
        })
    } catch (error) {
        console.log("error " + error)
    }
}

exports.asalRumput = async (req, res, next) => {
    try {
        const query = "SELECT * FROM asal_rumput"
        db.query(query, (err, results) => {
            if (err) throw err
            if (results.length > 0) {
                res.render('atasan/asalRumput', {
                    data: results
                })
            } else {
                req.flash('error_data', 'Gagal ambil data, coba lagi')
                res.render('atasan/asalRumput', { data: results })
            }
        })
    } catch (error) {
        console.log("error " + error)
    }
}