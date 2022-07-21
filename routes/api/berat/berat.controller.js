const db = require("../../../config/db")
const mail = require("../../../helper/send.email")

exports.store = async (req, res, next) => {
    try {
        // const data = { 
        //     id_user: req.body.id_user,
        //     nama_driver: req.body.nama_driver,
        //     berat: req.body.berat,
        //     id_truk: req.body.id_truk,
        //     jenis_rumput: req.body.jenis_rumput,
        //     asal_rumput: req.body.asal_rumput,
        //     status_email: "terkirim",
        //     berat_aktual: berat_aktual
        //  } ij

        const data = {...req.body}
        var berat = req.body.berat_aktual
        const query = 'INSERT INTO berat SET ?; ' +
            'SELECT * FROM user WHERE role = "superadmin";'

        db.query(query, data, (err, result, filed) => {
            if (err) {
                return res.status(500).json({
                    status: 'failed',
                    message: 'Gagal insert data!',
                    error: err
                })
            }
            var dataSuperadmin = result[1]
            var email = ""
            // console.log(result[1])
            const dt = new Date()
            let year = dt.getFullYear()
            let month = dt.getMonth() + 1
            let day = dt.getDate()
            let hour = dt.getHours()
            let minute = dt.getMinutes()
            let second = dt.getSeconds()
            let date = hour + ":" + minute + ":" + second + " " + day + "-" + month + "-" + year
            console.log(date)
            if (dataSuperadmin.length > 1) {
                for (let index = 0; index < dataSuperadmin.length; index++) {
                    email += result[1][index].email + ','
                }
                const payload = {
                    email: email,
                    name: result[1][0].nama,
                    load: berat,
                    date: date
                }
                mail.sendEmailTimbangan(payload)
            } else {
                const payload = {
                    email: result[1][0].email,
                    name: result[1][0].nama,
                    load: berat,
                    date: date
                }
                mail.sendEmailTimbangan(payload)
            }
            
            var id = result[0].insertId
            var queryBerat = "SELECT berat.*, date_format(berat.created_at, '%d-%m-%Y') as tanggal, driver.nama as driver, user.nama as pic FROM berat" +
                " JOIN driver ON berat.id_driver = driver.id" +
                " JOIN user ON berat.id_user = user.id WHERE berat.id = ?"
            db.query(queryBerat, id, (err, result, filed) => {
                return res.status(200).json({
                    status: 'success',
                    message: 'Berhasil insert data!',
                    error: '',
                    data: result
                })
            })
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            message: 'Gagal insert data!',
            error: error.body
        })
    }
}