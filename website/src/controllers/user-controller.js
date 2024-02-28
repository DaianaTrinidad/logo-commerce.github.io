const { v4: uuidv4 } = require('uuid');

const {validationResult} = require("express-validator")
const User = require("../data/User")
const bcrypt = require("bcryptjs")
const userServices = require("../services/userServices")

module.exports = {

// USERS

    login: (req, res) =>  {
        res.render("login")
    },

    profile: (req, res) => {
        const user = req.session.userLogged
        res.render("user_profile", {user})
    },

    logout: (req, res) => {
        req.session.destroy()
        res.cookie("recordame", "", {maxAge: -1})
        res.redirect("/login")
        
    },

    access: async (req, res) => {

        const userInDB = await userServices.findUserEmail(req.body.email)

        if(!userInDB){
            return res.render("login", {
                errors: {
                    email: {
                        msg: "Email incorrecto"
                    }
                }
            })
        }
        
        if(req.body.recordame != undefined) {
            res.cookie("recordame", req.body.email, {maxAge: (1000 * 60) * 2})
        }

        if(!bcrypt.compareSync(req.body.password, userInDB.password)){
            return res.render("login", {
                errors: {
                    password: {
                        msg: "Contraseña incorrecta"
                    }
                }
            })

        } else {
            //userLogged es el nombre que le doy a la propiedad del session
            req.session.userLogged = userInDB
            //defino si el usuario es admin o no y lo guardo en session
            if (userInDB.rank == "admin"){
                req.session.admin = true
            }
            return res.redirect("/profile")
        }
        
    },

    registro: (req, res) => {
        res.render("registro")
    },

    procesoRegistro: async (req, res) => {
        let errors = validationResult(req)

        if(errors.errors.length > 0){
            return res.render("registro", {errors: errors.mapped(), oldData: req.body})
        }

        let userInDB = await userServices.findUserEmail(req.body.email)

        if(userInDB){
            return res.render("registro", {errors: {email: {msg: "El email ingresado ya está en uso"}}, oldData: req.body})
        }

        let nuevoUsuario = {
            ...req.body,
            id:uuidv4(),
            password: bcrypt.hashSync(req.body.password, 10),
            profile_picture: req.file.filename,
            rank: "user"
        }

        userServices.createUser(nuevoUsuario)

        return res.redirect("/login")
    },
    editProfile: (req, res) =>{
        const id = req.params.id
        return userServices.getUserId(id).then(user => res.render("edit_profile", {user}))
    },

    productEditProcessProfile: (req, res) => {
        const user = req.body
        console.log(user);
        const id = req.params.id
        req.session.userLogged = {...req.session.userLogged, ...user}
        return userServices.updateUser(user, id).then(user => res.redirect("/profile"))
    },
}