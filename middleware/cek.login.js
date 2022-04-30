exports.cekLogin = (req,res,next) => {
    var session = req.cookies
    const login = session.login
    // console.log("cek login " + login)
    // var state = login
    // console.log(state)
    if(login === 'true') {
        next()
        return
    } else {
        // console.log("cek login " + login)
        res.cookie('login', false)
        res.cookie('nama', "")
        res.cookie('role', "")
        res.redirect('auth')
    }
}