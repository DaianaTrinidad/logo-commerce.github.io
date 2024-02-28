const { Products } = require("../database/models");
const Sequelize = require("sequelize");

const productoServices = {

    getAllProducts:()=>{
        return Products.findAll({
            include: [
                "size",
                "shopping_cart"
            ]
        })
    },

    getProductId: (id) => {
        return Products.findByPk(id)
    },

    createProduct: (product, image) => {
        return Products.create({
            price: product.price,
            discount: product.discount,
            product_name: product.name,
            image: image
        })
    },

    updateProduct: (product, id, image) => {
        return Products.update({
            price: product.price,
            discount: product.discount,
            product_name: product.name,
            image: image
        }, {
            where: {id: id}
        })
    },

    deleteProduct: (id) => {
        return Products.destroy({
            where: {id: id}
        })
    },
};

module.exports = productoServices;