const mongoose=require("mongoose");


const Puestos=mongoose.Schema({
    nombre: String,
    imagen: String,
    direccion: String,
    telefono: Number,
    created_at:Date
})

module.exports=mongoose.model("puestos", Puestos);