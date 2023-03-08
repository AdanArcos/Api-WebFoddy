const mongoose=require("mongoose");

//Linea de codigo que evita poner la S
mongoose.pluralize(null)

const Vendedores=mongoose.Schema({
    nombre: String,
    apellidos: String,
    telefono: Number,
    created_at:Date
})

module.exports=mongoose.model("vendedores", Vendedores);