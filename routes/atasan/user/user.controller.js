const db = require("../../../config/db")

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