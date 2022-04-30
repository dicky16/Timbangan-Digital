exports.cekRoleAdmin = (req,res,next) => {
    var session = req.cookies
    var role = session.role
    if(role == "admin") {
        next()
    } else {
        res.redirect('auth')
    }
}

exports.cekRoleSuperadmin = (req,res,next) => {
    var session = req.cookies
    var role = session.role
    if(role == "superadmin") {
        next()
    } else {
        res.redirect('auth')
    }
}