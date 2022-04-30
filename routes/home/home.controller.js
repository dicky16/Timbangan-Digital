const db = require("../../config/db")


exports.home = async (req, res, next) => {
    var total = 0
    var truk = 0
    var avg = 0
    const query = "SELECT * FROM berat; SELECT * FROM berat WHERE DATE(created_at) = CURDATE(); "
    
    db.query(query, (err, results) => {
        if (err) throw err
        if (results[0].length > 0) {
            for (let index = 0; index < results[0].length; index++) {
                total += parseFloat(results[0][index].berat)
            }
            truk = results[0].length
            total = parseFloat(total/1000).toFixed(1)
            avg = parseFloat(total/truk).toFixed(1)
            res.render('home', {
                total: total,
                truk: truk,
                avg: avg,
                dataToday: results[1]
            })
        } else {
            res.render('home', {
                total: total,
                truk: truk,
                avg: avg,
                dataToday: results[1]
            })
        }
    })
}

exports.lastSevenDays = async (req, res, next) => {
    const query = "SELECT *, WEEKDAY(created_at) as days FROM berat WHERE DATE(updated_at) >= CURDATE()-7 AND DATE(updated_at) <= CURRENT_DATE();"

    db.query(query, (err, results) => {
        if (err) throw err
        // console.log(results)
        if (results.length > 0) {
            res.json({
                data: results,
                message: 'success',
            });
        }
    })
}

exports.email = async (req, res) => {
    res.render('email')
}