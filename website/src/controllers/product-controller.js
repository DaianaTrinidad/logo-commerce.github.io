const productoServices = require("../services/productServices")
const sizesServices = require("../services/sizeServicies")
const {validationResult} = require("express-validator")

module.exports = {

// PRODUCTOS

    createForm:(req, res) => {
        res.render("product-create-form",)
    },

    list: (req, res) => {
        productoServices.getAllProducts()
            .then((products) => {
            res.render("products", {products});
        })
    },

    productCreateProcess: (req, res) => {
        let errors = validationResult(req)

        if(errors.errors.length > 0){
            return res.render("product-create-form", {errors: errors.mapped(), oldData: req.body})
        }

        productoServices.createProduct(req.body, req.file.filename).then(res.redirect("/products"))
    },

    productDetail: async (req, res) => {
        const id = req.params.id
        const sizes = await sizesServices.getAllSize()
        const product = await productoServices.getProductId(id)

        return res.render("detalle_de_producto", {product, sizes})
    },

    productEditForm: (req, res) => {
        let errors = validationResult(req)

        if(errors.errors.length > 0){
            return res.render("product-edit-form", {errors: errors.mapped(), oldData: req.body})
        }

        const id = req.params.id
        return productoServices.getProductId(id).then(product => res.render("product-edit-form", {product}))
    },

    productEditProcess: async (req, res) => {
        let errors = validationResult(req)
        const id = req.params.id

        if(errors.errors.length > 0){
            const productoAEditar = await productoServices.getProductId(id)
            return res.render("product-edit-form", {product:productoAEditar, errors: errors.mapped(), oldData: req.body})
        }

        const product = req.body
        console.log("ID DEL PRODUCTO A EDITAR ====>>>>", id)
        return productoServices.updateProduct(product, id, req.file.filename).then(res.redirect("/products"))
    },

    productDelete: (req, res) => {
        const id = req.params.id
        productoServices.deleteProduct(id).then(() => res.redirect("/products"))
    },
}