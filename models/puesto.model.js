const mongoose = require("mongoose");

const Puestos = mongoose.Schema({
  nombre: String,
  imagenes: Array,
  direccion: String,
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

module.exports = mongoose.model("puestos", Puestos);
