const db = require("../../../config/db")

exports.findAllJenisRumput = async (req, res, next) => { 
    try {
        const query = "SELECT * FROM jenis_rumput"
        db.query(query, (err, results) => {
            res.json({
                status: "success",
                length: results.length,
                data: results,
            })
        })
    } catch (error) {
        next(error)
    }
}

exports.findAllAsalRumput = async (req, res, next) => { 
    try {
        const query = "SELECT * FROM asal_rumput"
        db.query(query, (err, results) => {
            res.json({
                status: "success",
                length: results.length,
                data: results,
            })
        })
    } catch (error) {
        next(error)
    }
}

exports.findAllTruk = async (req, res, next) => { 
    try {
        const query = "SELECT * FROM truk"
        db.query(query, (err, results) => {
            res.json({
                status: "success",
                length: results.length,
                data: results,
            })
        })
    } catch (error) {
        next(error)
    }
}