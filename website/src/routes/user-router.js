// ************* Requires *************

const {Router} = require("express")
const userController = require("../controllers/user-controller")
const registerValidations = require("../middledware/registerValidations")
const multerUpload = require("./multer/multerUsersConfig")
// ************* Router *************

const router = Router()

// ************* Middlewares *************

const guetsMiddleware = require("../middledware/guetsMiddleware")
const authMiddleware = require("../middledware/authMiddleware")

// ************* Rutas *************

//USERS ROUTERS

router.get("/login", guetsMiddleware, userController.login)
router.post("/login", userController.access)
router.get("/profile", authMiddleware ,userController.profile)
router.post("/logout", userController.logout)

router.get("/registro", guetsMiddleware, userController.registro)
router.post("/registro", multerUpload.single("imagenDePerfil"), registerValidations, userController.procesoRegistro)

router.get("/profile/:id/edit", authMiddleware,userController.editProfile)
router.put("/profile/:id", userController.productEditProcessProfile)

// Export
module.exports = router;