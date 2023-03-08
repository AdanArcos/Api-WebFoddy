const Comidas=require("../models/comidas.model");

 function createComidas(req,res){
    const comidas=new Comidas(req.body);
   
    comidas.save((error, comidaStored)=>{
        if(error){
            res.status(400).send({msg: "Error al guardar los datos"})
        }else{
            res.status(200).send(comidaStored)
        }
    })
}

function getComidas(req,res){
    Comidas.find((error, comidasStored)=>{
        if(error){
            res.status(500).send({msg:"No hay datos que consultar"})
        }else{
            res.status(200).send(comidasStored)
        }
    })
}

 function deleteComida(req,res){
    const {id}=req.params;

    Comidas.findByIdAndDelete(id, (error)=>{
        if(error){
            res.status(400).send({msg:"Error al eliminar comida"})
        }else{
            res.status(200).send({msg: "Comida eliminada"})
        }
    })
}

function updateComidas(req,res){
   const {id}=req.params;
   const datosComida=req.body;

   Comidas.findByIdAndUpdate({_id:id},datosComida, (error)=>{
    if(error){
        res.status(400).send({msg: "Datos no actualizados"})
    }else{
        res.status(200).send({msg: "Los datos fueron actualizados correctamente"})
    }
   })
}




module.exports={
    createComidas,
    getComidas,
    deleteComida,
    updateComidas
}