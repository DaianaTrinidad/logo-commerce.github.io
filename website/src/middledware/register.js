module.exports = (req,res,next)=>{
    if(req.session.register){
        next()
    }else{
        res.redirect("/login");
}
};