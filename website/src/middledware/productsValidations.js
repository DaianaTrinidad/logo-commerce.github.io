const {body} = require("express-validator")
const path = require("path")

module.exports = [
    body("name").notEmpty().withMessage("Debes introducir tu nombre").isLength({min: 5}).withMessage("El nombre debe contener al menos 5 caracteres"),
    body("price").notEmpty().withMessage("Debes introducir un precio"),
    body("discount").notEmpty().withMessage("Debes introducir un descuento"),
    body("image").custom((value, {req}) => {
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
