const mongoose=require("mongoose");


const Puestos=mongoose.Schema({
    nombre: String,
    imagen: String,
    direccion: String,
    telefono: String,
    created_at:Date
})

module.exports=mongoose.model("puestos", Puestos);