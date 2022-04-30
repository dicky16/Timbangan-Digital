const db = require("../../../config/db")

exports.findById = async (req, res, next) => {
    try {
        var id = req.params.id
        const query = "SELECT * FROM user WHERE id = ?"
        db.query(query, id, (err, results) => {
            res.json({
                status: "success",
                data: results[0],
            })
        })
    } catch (error) {
        next(error)
    }
}