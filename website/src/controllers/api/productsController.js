const productoServices = require("../../services/productServices");

module.exports = {

    list: async (req, res) => {
    const products = await productoServices.getAllProducts();
    res.json({
      meta: {
        status: 201,
        url: req.originalUrl,
        total: products.length
      },
      products: products.map(product => ({
        id: product.id,
        name: product.product_name,
        price: product.price,
        discount: product.discount,
        image: product.image,
        detail: `http://localhost:3011/api/products/${product.id}`
      })),
    })},

    productDetail: async (req, res) => {
      const product = await productoServices.getProductId(req.params.id);
      res.json({
        meta: {
          status: 201,
          id: req.params.id,
        },
        data: product,
      })
    },
};