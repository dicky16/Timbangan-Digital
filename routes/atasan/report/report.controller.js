const db = require("../../../config/db")

exports.report = async (req, res, next) => {
    var cookie = req.cookies
    var id = cookie.id
    var role = cookie.role
    var query = ''
    if (role == 'superadmin') {
        query = "SELECT berat.*, date_format(berat.created_at, '%d-%m-%Y %H:%m:%s') as tanggal, user.nama as pic FROM berat" +
            " JOIN user ON berat.id_user = user.id;" +
            "SELECT * FROM jenis_rumput;" +
            "SELECT * FROM asal_rumput;"
    } else {
        query = "SELECT berat.*, date_format(berat.created_at, '%d-%m-%Y %H:%m:%s') as tanggal, user.nama as pic FROM berat" +
            " JOIN user ON berat.id_user = user.id WHERE berat.id_user = " + id +";" +
            "SELECT * FROM jenis_rumput;" +
            "SELECT * FROM asal_rumput;"
    }
    db.query(query, (err, results) => {
        if (err) throw err
        if (results.length > 0) {
            console.log(results)
            res.render('atasan/report', {
                data: results[0],
                jRumput: results[1],
                aRumput: results[2]
            })
        } else {
            req.flash('error_data', 'Gagal ambil data, coba lagi')
            res.render('atasan/report', { data: results })
        }
    })
}

exports.today = async (req, res) => {
    var cookie = req.cookies
    var id = cookie.id
    var role = cookie.role
    var query = ''
    if(role == 'superadmin') {
        query = "SELECT berat.*, date_format(berat.created_at, '%d-%m-%Y') as tanggal, driver.nama as driver, user.nama as pic FROM berat" +
        " JOIN driver ON berat.id_driver = driver.id" +
        " JOIN user ON berat.id_user = user.id WHERE date_format(berat.created_at, '%Y-%m-%d') = CURRENT_DATE"
    } else {
        query = "SELECT berat.*, date_format(berat.created_at, '%d-%m-%Y') as tanggal, driver.nama as driver, user.nama as pic FROM berat" +
        " JOIN driver ON berat.id_driver = driver.id" +
        " JOIN user ON berat.id_user = user.id WHERE date_format(berat.created_at, '%Y-%m-%d') = CURRENT_DATE" +
        "WHERE berat.id_user = " + id +";"
    }
    try {
        db.query(query, (err, results) => {
            // console.log(results)
            if (err) throw err
            if (results.length > 0) {
                res.render('atasan/report', {
                    data: results
                })
            } else {
                req.flash('error', 'Gagal ambil data, coba lagi')
                res.render('atasan/report', { error: err , data: results})
            }
        })
    } catch (error) {
        req.flash('error', 'Gagal ambil data, coba lagi')
        res.render('atasan/report', { error: error, data: ""})
    }
}

exports.byDate = async (req, res) => {
    var cookie = req.cookies
    var id = cookie.id
    var role = cookie.role
    var query = ''
    if(role == 'superadmin') {
        query = "SELECT berat.*, date_format(berat.created_at, '%d-%m-%Y') as tanggal, user.nama as pic FROM berat" +
            " JOIN user ON berat.id_user = user.id WHERE date_format(berat.created_at, '%Y-%m-%d') = ? OR berat.jenis_rumput = ? OR berat.asal_rumput = ?;" +
            "SELECT * FROM jenis_rumput;" +
            "SELECT * FROM asal_rumput;"
    } else {
        query = "SELECT berat.*, date_format(berat.created_at, '%d-%m-%Y') as tanggal, user.nama as pic FROM berat" +
        " JOIN user ON berat.id_user = user.id WHERE date_format(berat.created_at, '%Y-%m-%d') = ? OR berat.jenis_rumput = ? OR berat.asal_rumput = ?" +
        "WHERE berat.id_user = " + id +";"+
        "SELECT * FROM jenis_rumput;" +
        "SELECT * FROM asal_rumput;"
    }
    try {
        var date = req.query.select
        var asalRumput = req.query.asal_rumput
        var jenisRumput = req.query.jenis_rumput
        // console.log(date)
        db.query(query, [date, jenisRumput, asalRumput], (err, results) => {
            console.log(results)
            if (err) throw err
            if (results.length > 0) {
                res.render('atasan/report', {
                    data: results[0],
                    jRumput: results[1],
                    aRumput: results[2]
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