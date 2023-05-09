const comidasModel = require("../models/comidas.model");
const Puestos = require("../models/puesto.model");
const guardarImg = require("../Services/guardarImg");

async function createPuestos(req, res) {
  try {
    const { vendedor, nombre } = JSON.parse(req.body.datos);
    const { _id } = vendedor;
    const { imagenes } = req.files;
    const stackimg = [];

    if (!imagenes.length) {
      const ext = guardarImg(imagenes, `${_id}ind0${nombre}`, "puestos");
      stackimg.push(`assets/puestos/${_id}ind0${nombre}.${ext}`);
    } else {
      imagenes.forEach((img, index) => {
        const ext = guardarImg(img, `${_id}ind${index}${nombre}`, "puestos");
        stackimg.push(`assets/puestos/${_id}ind${index}${nombre}.${ext}`);
      });
    }
    const vendedores = new Puestos({
      ...JSON.parse(req.body.datos),
      imagenes: stackimg,
    });
    const guardar = await vendedores.save();
    res.status(200).send(guardar);
  } catch (err) {
    res.status(400).send({ msg: "Error al guardar los datos" });
  }
}

function getPuestos(req, res) {
  Puestos.find((error, puestosStored) => {
    if (error) {
      res.status(500).send({ msg: "No hay datos que consultar" });
    } else {
      res.status(200).send(puestosStored);
    }
  });
}

function getPuestosByVendedor(req, res) {
  const { id } = req.params;
  Puestos.find({ "vendedor._id": id }, (error, puestosStored) => {
    if (error) {
      res.status(500).send({ msg: "No hay datos que consultar" });
    } else {
      res.status(200).send(puestosStored);
    }
  });
}

function getPuesto(req, res) {
  Puestos.findOne({ _id: req.params.idPuesto }, (error, puestosStored) => {
    if (error) {
      res.status(500).send({ msg: "No hay datos que consultar" });
    } else {
      res.status(200).send(puestosStored);
    }
  });
}

async function deletePuesto(req, res) {
  const { id } = req.params;

  await comidasModel.deleteMany({ "puesto._id": id });

  Puestos.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el puesto" });
    } else {
      res.status(200).send({ msg: "Puesto eliminado" });
    }
  });
}

async function updatePuestos(req, res) {
  const { id } = req.params;
  const datosPuesto = req.body;

  await comidasModel.updateMany({ "puesto._id": id }, { puesto: datosPuesto });

  Puestos.findByIdAndUpdate({ _id: id }, datosPuesto, (error) => {
    if (error) {
      res.status(400).send({ msg: "Datos no actualizados" });
    } else {
      res
        .status(200)
        .send({ msg: "Los datos fueron actualizados correctamente" });
    }
  });
}

module.exports = {
  createPuestos,
  getPuestos,
  deletePuesto,
  updatePuestos,
  getPuesto,
  getPuestosByVendedor,
};
