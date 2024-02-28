// ************* Requires *************

const {Router} = require("express")
const mainController = require("../controllers/main-controller")
const apiRouter = require('./api/index')

// ************* Router *************

const router = Router()

// ************* Rutas *************

router.use('/api', apiRouter )

router.get("/", mainController.home)
router.post("/", mainController.redirect)

// Export


module.exports = router;