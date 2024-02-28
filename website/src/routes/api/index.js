const express = require('express');
const router = express.Router();
const apiUsersRouter = require('./users-api');
const apiProductsRouter = require("./products-api");

router.use("/users", apiUsersRouter);
router.use("/products", apiProductsRouter);


module.exports = router;