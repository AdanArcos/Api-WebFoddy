const express = require("express");
const VendedoresController = require("../controller/vendedores.controller");

const api = express.Router();

api.post("/vendedor", VendedoresController.createVendedores);
api.get("/vendedores", VendedoresController.getVendedores);
api.post("/vendedorLo", VendedoresController.getVendedor);
api.delete("/vendedor/:id", VendedoresController.deleteVendedor);
api.patch("/vendedor/:id", VendedoresController.updateVendedores);

module.exports = api;
