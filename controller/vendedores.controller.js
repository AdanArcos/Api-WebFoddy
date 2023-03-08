const Vendedores=require("../models/vendedores.model");

 function createVendedores(req,res){
    const vendedores=new Vendedores(req.body);
   
    vendedores.save((error, vendedorStored)=>{
        if(error){
            res.status(400).send({msg: "Error al guardar los datos"})
        }else{
            res.status(200).send(vendedorStored)
        }
    })
}

function getVendedores(req,res){
    Vendedores.find((error, vendedoresStored)=>{
        if(error){
            res.status(500).send({msg:"No hay datos que consultar"})
        }else{
            res.status(200).send(vendedoresStored)
        }
    })
}

 function deleteVendedor(req,res){
    const {id}=req.params;

    Vendedores.findByIdAndDelete(id, (error)=>{
        if(error){
            res.status(400).send({msg:"Error al eliminar el vendedor"})
        }else{
            res.status(200).send({msg: "Vendedor eliminado"})
        }
    })
}

function updateVendedores(req,res){
   const {id}=req.params;
   const datosVendedor=req.body;

   Vendedores.findByIdAndUpdate({_id:id},datosVendedor, (error)=>{
    if(error){
        res.status(400).send({msg: "Datos no actualizados"})
    }else{
        res.status(200).send({msg: "Los datos fueron actualizados correctamente"})
    }
   })
}




module.exports={
    createVendedores,
    getVendedores,
    deleteVendedor,
    updateVendedores
}