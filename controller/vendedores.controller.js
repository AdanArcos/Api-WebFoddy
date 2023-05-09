const comidasModel = require("../models/comidas.model");
const puestoModel = require("../models/puesto.model");
const Vendedores = require("../models/vendedores.model");
const guardarImg = require("../Services/guardarImg");

async function createVendedores(req, res) {
  try {
    const { nombre, apepat, apemat } = JSON.parse(req.body.datos);
    const archivo = req.files.avatar;
    const nArchivo = nombre + apepat + apemat;
    const ext = guardarImg(archivo, nArchivo, "avatar");
    const vendedores = new Vendedores({
      ...JSON.parse(req.body.datos),
      avatar: `assets/avatar/${nArchivo}.${ext}`,
    });
    const guardar = await vendedores.save();
    res.status(200).send(guardar);
  } catch (err) {
    res.status(400).send({ msg: "Error al guardar los datos" });
  }
}

function getVendedores(req, res) {
  Vendedores.find((error, vendedoresStored) => {
    if (error) {
      res.status(500).send({ msg: "No hay datos que consultar" });
    } else {
      res.status(200).send(vendedoresStored);
    }
  });
}

function getVendedor(req, res) {
  const { correo, password } = req.body;
  Vendedores.find({ correo, password }, (error, vendedoresStored) => {
    if (error) {
      res.status(500).send({ msg: "No hay datos que consultar" });
    } else {
      console.log(vendedoresStored);
      if (vendedoresStored.length === 0) {
        res.status(500).send({ msg: "No se encontro al vendedor" });
      } else {
        res.status(200).send(vendedoresStored);
      }
    }
  });
}

function deleteVendedor(req, res) {
  const { id } = req.params;

  Vendedores.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el vendedor" });
    } else {
      res.status(200).send({ msg: "Vendedor eliminado" });
    }
  });
}

async function updateVendedores(req, res) {
  const { id } = req.params;
  const datosVendedor = req.body;

  await puestoModel.updateMany(
    { "vendedor._id": id },
    {
      vendedor: datosVendedor,
    }
  );

  await comidasModel.updateMany(
    { "vendedor._id": id },
    {
      vendedor: datosVendedor,
    }
  );

  Vendedores.findByIdAndUpdate({ _id: id }, datosVendedor, (error) => {
    if (error) {
      res.status(400).send({ msg: "Datos no actualizados" });
    } else {
      console.log("todo correcto");
      res
        .status(200)
        .send({ msg: "Los datos fueron actualizados correctamente" });
    }
  });
}

module.exports = {
  createVendedores,
  getVendedores,
  deleteVendedor,
  updateVendedores,
  getVendedor,
};
