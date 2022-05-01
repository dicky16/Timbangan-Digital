const db = require("../../../config/db")

exports.report = async (req, res, next) => {
    var cookie = req.cookies
    var id = cookie.id
    var role = cookie.role
    var query = ''
    if (role == 'superadmin') {
        query = "SELECT berat.*, date_format(berat.created_at, '%d-%m-%Y') as tanggal, driver.nama as driver, user.nama as pic FROM berat" +
            " JOIN driver ON berat.id_driver = driver.id" +
            " JOIN user ON berat.id_user = user.id;"
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
            res.render('atasan/report', { data: results })
        }
    })
}

exports.today = async (req, res) => {
    try {
        const query = "SELECT berat.*, date_format(berat.created_at, '%d-%m-%Y') as tanggal, driver.nama as driver, user.nama as pic FROM berat" +
            " JOIN driver ON berat.id_driver = driver.id" +
            " JOIN user ON berat.id_user = user.id WHERE date_format(berat.created_at, '%Y-%m-%d') = CURRENT_DATE"
        db.query(query, (err, results) => {
            // console.log(results)
            if (err) throw err
            if (results.length > 0) {
                res.render('atasan/report', {
                    data: results
                })
            } else {
                req.flash('error', 'Gagal ambil data, coba lagi')
                res.render('atasan/report', { error: err })
            }
        })
    } catch (error) {
        req.flash('error', 'Gagal ambil data, coba lagi')
        res.render('atasan/report', { error: error })
    }
}

exports.byDate = async (req, res) => {
    try {
        var date = req.query.select
        // console.log(date)
        const query = "SELECT berat.*, date_format(berat.created_at, '%d-%m-%Y') as tanggal, driver.nama as driver, user.nama as pic FROM berat" +
            " JOIN driver ON berat.id_driver = driver.id" +
            " JOIN user ON berat.id_user = user.id WHERE date_format(berat.created_at, '%Y-%m-%d') = ? "
        db.query(query, date, (err, results) => {
            // console.log(results)
            if (err) throw err
            if (results.length > 0) {
                res.render('atasan/report', {
                    data: results
                })
            } else {
                req.flash('error', 'Gagal ambil data, coba lagi')
                res.render('atasan/report', { data: results, error: err })
            }
        })
    } catch (error) {
        var results = []
        req.flash('error', 'Gagal ambil data, coba lagi')
        res.render('atasan/report', { data: results,error: error })
    }
}

exports.getDate = async (req, res) => {
    try {
        const query = "SELECT DISTINCT date_format(created_at, '%Y-%m-%d') as date FROM `berat`"
        db.query(query, (err, results) => {
            if (err) throw err
            if (results.length > 0) {
                res.status(200).json({
                    status: 'success',
                    data: results
                })
            } else {
                res.status(500).json({
                    status: 'error',
                    data: results
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            data: results
        })
    }
}