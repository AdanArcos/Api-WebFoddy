const express=require("express");
const ComidasController= require("../controller/comidas.controller");

const api=express.Router();

api.post("/comida",ComidasController.createComidas);
api.get("/comidas",ComidasController.getComidas);
api.delete("/comida/:id",ComidasController.deleteComida);
api.patch("comida/:id",ComidasController.updateComidas);


module.exports=api;