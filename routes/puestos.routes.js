const express = require("express");
const PuestosController = require("../controller/puestos.controller");

const api = express.Router();

api.post("/puesto", PuestosController.createPuestos);
api.get("/puestos", PuestosController.getPuestos);
api.get("/puestosXVendedor/:id", PuestosController.getPuestosByVendedor);
api.get("/puestos/:idPuesto", PuestosController.getPuesto);
api.delete("/puesto/:id", PuestosController.deletePuesto);
api.patch("/puesto/:id", PuestosController.updatePuestos);

module.exports = api;
