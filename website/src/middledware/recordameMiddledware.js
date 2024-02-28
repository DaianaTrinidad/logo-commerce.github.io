const {Users} = require ("../database/models");

let recordameMiddleware = async (req, res, next) => {
    res.locals.isLogged = false

    if (req.cookies.recordame){
        let userFromCookie = await Users.findOne({
            where : {email: req.cookies.recordame}
        })
        req.session.userLogged = userFromCookie
        if(userFromCookie.rank === "admin"){
            req.session.admin = true
        }
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
    }

    return next ()
}

module.exports = recordameMiddleware