// ************* Requires *************

const express = require ('express');
const path = require('path')
const methodOverride = require("method-override");
const mainRouter = require("./routes/main-router")
const productRouter = require("./routes/product-router")
const userRouter = require("./routes/user-router")
const shoppingCartRouter = require("./routes/shopping-cart-router")

// ************* Session *************

const session = require ('express-session');

// ************* Cookies *************
const cookies = require("cookie-parser");

// ************* App *************

const app = express();

// ************* CORS *************

const cors = require("cors");
app.use(
  cors(
    (corsOptions = {
      origin: "*",
    })
  )
);

// ************* Middlewares *************

const userLoggedMiddleware = require("./middledware/userLoggedMiddleware")
const userAdmin = require("./middledware/userAdmin")
const recordameMiddleware = require("./middledware/recordameMiddledware")


// ************* Uses *************
app.use(express.static(path.join(__dirname, '../public')))
app.use(methodOverride("_method"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(
    session({
        secret:"sessionGeneral",
        resave:false,
        saveUninitialized:false,
    })
);
app.use(cookies())
app.use(userLoggedMiddleware)
app.use(userAdmin)
app.use(recordameMiddleware)

// ************* Sets *************

app.set("view engine", "ejs")
app.set("views", "./src/views")

// ************* Start server *************

const PORT= process.env.PORT || 3011
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))

// ************* Router *************

app.use(mainRouter)
app.use(productRouter)
app.use(userRouter)
app.use(shoppingCartRouter)