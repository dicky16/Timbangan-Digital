const db = require("../../../config/db")

exports.truk = async (req, res, next) => {
    try {
        const query = "SELECT * FROM truk"
        db.query(query, (err, results) => {
            if (err) throw err
            if (results.length > 0) {
                res.render('atasan/truk', {
                    data: results
                })
            } else {
                req.flash('error_data', 'Gagal ambil data, coba lagi')
                res.render('atasan/truk', { data: results })
            }
        })
    } catch (error) {
        console.log("error " + error)
    }
}

exports.store = async (req, res, next) => {
    const data = {
        ...req.body
    }
    try {
        const query = "INSERT INTO truk SET ?"
        db.query(query, data, (err, results) => {
            if (err) throw err
            res.redirect('/truk')
        })
    } catch (error) {
        console.log("error " + error)
    }
}

exports.destroy = async (req, res, next) => {
    var id = req.params.id
    try {
        const query = "DELETE FROM truk WHERE id=" + id
        db.query(query, (err, results) => {
            if (err) throw err
            res.redirect('/truk')
        })
    } catch (error) {
        console.log("error " + error)
    }
}