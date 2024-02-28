function isAdmin(req, res, next){
   if(!req.session.admin){
        return res.redirect("/products")
    }
    next();
}

module.exports = isAdmin