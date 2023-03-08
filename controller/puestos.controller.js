const Puestos=require("../models/puesto.model");

 function createPuestos(req,res){
    const puestos=new Puestos(req.body);
   
    puestos.save((error, puestoStored)=>{
        if(error){
            res.status(400).send({msg: "Error al guardar los datos"})
        }else{
            res.status(200).send(puestoStored)
        }
    })
}

function getPuestos(req,res){
    Puestos.find((error, puestosStored)=>{
        if(error){
            res.status(500).send({msg:"No hay datos que consultar"})
        }else{
            res.status(200).send(puestosStored)
        }
    })
}

 function deletePuesto(req,res){
    const {id}=req.params;

    Puestos.findByIdAndDelete(id, (error)=>{
        if(error){
            res.status(400).send({msg:"Error al eliminar el puesto"})
        }else{
            res.status(200).send({msg: "Puesto eliminado"})
        }
    })
}

function updatePuestos(req,res){
   const {id}=req.params;
   const datosPuesto=req.body;

   Puestos.findByIdAndUpdate({_id:id},datosPuesto, (error)=>{
    if(error){
        res.status(400).send({msg: "Datos no actualizados"})
    }else{
        res.status(200).send({msg: "Los datos fueron actualizados correctamente"})
    }
   })
}




module.exports={
    createPuestos,
    getPuestos,
    deletePuesto,
    updatePuestos
}