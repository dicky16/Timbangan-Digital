const db = require("../../../config/db")

exports.store = async (req, res, next) => {
    try {
        const data = { ...req.body }
        const query = 'INSERT INTO driver SET ?'

        db.query(query, data, (err, result, filed) => {
            if (err) {
                return res.status(500).json({
                    status: 'failed',
                    message: 'Gagal insert data!',
                    error: err
                })
            }
            var id = result.insertId
            db.query("SELECT * FROM driver WHERE id=?", id, (err, result, filed) => {
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