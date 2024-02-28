const { ShoppingCart } = require("../database/models");
const productoServices = require("./productServices")

const shoppingCartServices = {
    
    getAtllShoppingCart: () => {
        return ShoppingCart.findAll()
    },

    getAllShoppingCartUser: (idUser) => {
        return ShoppingCart.findAll({
            where: {id_users: idUser}
        })
    },

    addToCart: (producto, idUser, size, quantity, total) => {
        ShoppingCart.create({
            image: producto.image,
            product_name: producto.product_name,
            id_product: producto.id,
            total: total,
            id_users: idUser,
            quantity: quantity,
            size: size
        })
    },

    deleteProductFromCart: (id) => {
        return ShoppingCart.destroy({
            where: {id: id}
        })
    },

    productsFilter: (productos, req) => {
            const user = req.session.userLogged
            const userId = user.id
            const productosUsuario = []

            productos.forEach(producto => {
                if(userId === producto.id_users){
                    productosUsuario.push(producto)
                }
            });

            return productosUsuario
    },

    getTotalPrice: (productosUsuario) => {
        let total = 0

        productosUsuario.forEach(producto => {
            total += producto.total
        });

        return total
    },

    updateQuantity:(quantity, total, id) => {
        return ShoppingCart.update({
            quantity: quantity,
            total: total
        },{
            where: {id:id}
        })
    },

    addToCartIteration: (idProducto, userId, size, quantity, cartProducts, res) => {
        if(cartProducts.length < 1){
            productoServices.getProductId(idProducto).then(producto => {
                const total = producto.price * quantity
                shoppingCartServices.addToCart(producto, userId, size, quantity, total)
                return res.redirect("/carrito")
            })
        } else {
            for (let i = 0; i < cartProducts.length; i++) {
                if(cartProducts[i].id_users == userId && cartProducts[i].size == size && cartProducts[i].id_product == idProducto){
                    return productoServices.getProductId(idProducto).then(producto => {
                        const newQuantity = cartProducts[i].quantity + quantity
                        const newTotal = producto.price * newQuantity
                        shoppingCartServices.updateQuantity(newQuantity, newTotal, cartProducts[i].id)
                        res.redirect("/carrito")
                    })
                }
            }

            return productoServices.getProductId(idProducto).then(producto => {
                const total = producto.price * quantity
                shoppingCartServices.addToCart(producto, userId, size, quantity, total)
                res.redirect("/carrito")
            })
        }
    }

}

module.exports = shoppingCartServices