const mongoose = require("mongoose");

//Linea de codigo que evita poner la S
mongoose.pluralize(null);

const Vendedores = mongoose.Schema({
  nombre: String,
  apepat: String,
  apemat: String,
  telefono: String,
  correo: String,
  edad: Number,
  password: String,
  avatar: String,
  created_at: Date,
});

module.exports = mongoose.model("vendedores", Vendedores);
