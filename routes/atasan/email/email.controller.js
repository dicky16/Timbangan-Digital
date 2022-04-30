const db = require("../../../config/db")

exports.email = async (req, res, next) => {
    const cookie = req.cookies
    var id = cookie.id
    var role = cookie.role
    var query = ""
    if (role == 'admin') {
        query = "SELECT email.*, date_format(email.created_at, '%d-%m-%Y') as tanggal, user.nama as pic FROM email" +
            " JOIN user ON email.id_user = user.id" +
            " WHERE id_user =" + id
    } else {
        query = "SELECT email.*, date_format(email.created_at, '%d-%m-%Y') as tanggal, user.nama as pic FROM email" +
            " JOIN user ON email.id_user = user.id"
    }
    db.query(query, (err, results) => {
        if (err) throw err
        if (results.length > 0) {
            res.render('atasan/email', {
                data: results
            })
        } else {
            req.flash('error_data', 'Gagal ambil data, coba lagi')
            res.render('atasan/email', { data: results })
        }
    })
}