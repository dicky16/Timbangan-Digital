exports.cekRequest = (req,res,next) => {
    var token = "rahasisa"
    if(token == "rahasia") {
        next()
    }
}