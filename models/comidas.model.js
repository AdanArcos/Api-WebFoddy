const mongoose=require("mongoose");

//Linea de codigo que evita poner la S
mongoose.pluralize(null)

const Comidas=mongoose.Schema({
    tipo: String,
    nombre: String,
    precio: Number,
    mostrar: Boolean,
    created_at:Date
})

module.exports=mongoose.model("comidas", Comidas);