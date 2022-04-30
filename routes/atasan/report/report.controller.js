const db = require("../../../config/db")

exports.report = async (req, res, next) => {
    var cookie = req.cookies
    var id = cookie.id
    var role = cookie.role
    var query = ''
    if(role == 'superadmin') {
    query = "SELECT berat.*, date_format(berat.created_at, '%d-%m-%Y') as tanggal, driver.nama as driver, user.nama as pic FROM berat" +
        " JOIN driver ON berat.id_driver = driver.id" +
        " JOIN user ON berat.id_user = user.id"
    } else {
        query = "SELECT berat.*, date_format(berat.created_at, '%d-%m-%Y') as tanggal, driver.nama as driver, user.nama as pic FROM berat" +
        " JOIN driver ON berat.id_driver = driver.id" +
        " JOIN user ON berat.id_user = user.id WHERE berat.id_user = " + id
    }   
    db.query(query, (err, results) => {
        if (err) throw err
        if (results.length > 0) {
            res.render('atasan/report', {
                data: results
            })
        } else {
            req.flash('error_data', 'Gagal ambil data, coba lagi')
            res.render('atasan/report', {data: results})
        }
    })
}