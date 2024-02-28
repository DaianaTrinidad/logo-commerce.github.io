const {body} = require("express-validator")
const path = require("path")

module.exports = [
    body("name").notEmpty().withMessage("Debes introducir tu nombre"),
    body("lastName").notEmpty().withMessage("Debes introducir tu apellido"),
    body("email").notEmpty().withMessage("Debes introducir una dirección de correo").isEmail().withMessage("Debes introducir un correo electrónico válido"),
    body("password").notEmpty().withMessage("Debes introducir una contraseña").isLength({min: 6}).withMessage("La contraseña debe contener al menos 6 caracteres"),
    body("imagenDePerfil").custom((value, {req}) => {
        let file = req.file
        let extencionesAceptadas = [".png", ".jpg"]

        if(!file){
            throw new Error("Tienes que subir una imagen")
        } else {
            let extensionFile = path.extname(file.originalname)

            if(!extencionesAceptadas.includes(extensionFile)){
                throw new Error(`Las extensiones de archivo que se aceptan son: ${extencionesAceptadas.join(", ")}`)
            }
        }

        return true
    })
]