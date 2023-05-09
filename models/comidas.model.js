const mongoose = require("mongoose");

//Linea de codigo que evita poner la S
mongoose.pluralize(null);

const Comidas = mongoose.Schema({
  tipo: String,
  nombre: String,
  precio: Number,
  mostrar: Boolean,
  cantidad: Number,
  imagenes: Array,
  puesto: {
    _id: String,
    nombre: String,
    direccion: String,
    imagenes: Array,
  },
  vendedor: {
    _id: String,
    nombre: String,
    apepat: String,
    apemat: String,
    telefono: String,
    correo: String,
  },
  created_at: Date,
});

module.exports = mongoose.model("comidas", Comidas);
