const db = require("../../../config/db")

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

exports.storeAsalRumput = async (req, res, next) => {
    const data = {
        asal_rumput: req.body.asal_rumput
    }
    try {
        const query = "INSERT INTO asal_rumput SET ?"
        db.query(query, data, (err, results) => {
            if (err) throw err
            res.redirect('/asal-rumput')
        })
    } catch (error) {
        console.log("error " + error)
    }
}

exports.destroyAsalRumput = async (req, res, next) => {
    var id = req.params.id
    try {
        const query = "DELETE FROM asal_rumput WHERE id=" + id
        db.query(query, (err, results) => {
            if (err) throw err
            res.redirect('/asal-rumput')
        })
    } catch (error) {
        console.log("error " + error)
    }
}