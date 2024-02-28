// ************* Requires *************

const {Router} = require("express")
const shoppingCartController = require("../controllers/shopping-cart-controller")
const authMiddleware = require("../middledware/authMiddleware")
// ************* Router *************

const router = Router()

// ************* Rutas *************

router.get("/carrito", authMiddleware, shoppingCartController.carrito)
router.post("/carrito/:id", authMiddleware, shoppingCartController.agregarACarrito)
router.delete("/carrito/:id", authMiddleware, shoppingCartController.borrarProductoCarrito)

// Export

module.exports = router;