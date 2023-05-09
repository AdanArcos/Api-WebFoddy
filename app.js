const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const { API_VERSION } = require("./constants");

const app = express();

//importaciones de las rutas de la aplicacion
const vendedorRoutes = require("./routes/vendedores.routes");
const puestoRoutes = require("./routes/puestos.routes");
const comidaRoutes = require("./routes/comidas.routes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(cors());

//Configuración de las rutas
app.use(`/api/${API_VERSION}`, vendedorRoutes);
app.use(`/api/${API_VERSION}`, puestoRoutes);
app.use(`/api/${API_VERSION}`, comidaRoutes);
//Hola

module.exports = app;
