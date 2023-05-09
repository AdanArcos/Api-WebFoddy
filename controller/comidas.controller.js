const Comidas = require("../models/comidas.model");
const guardarImg = require("../Services/guardarImg");

async function createComidas(req, res) {
  try {
    const { puesto, nombre } = JSON.parse(req.body.datos);
    console.log(req.files);
    const { _id } = puesto;
    const { imagenes } = req.files;
    const stackimg = [];
    if (!imagenes.length) {
      const ext = guardarImg(imagenes, `${_id}ind0${nombre}`, "comidas");
      stackimg.push(`assets/comidas/${_id}ind0${nombre}.${ext}`);
    } else {
      imagenes.forEach((img, index) => {
        const ext = guardarImg(img, `${_id}ind${index}${nombre}`, "comidas");
        stackimg.push(`assets/comidas/${_id}ind${index}${nombre}.${ext}`);
      });
    }
    const comidas = new Comidas({
      ...JSON.parse(req.body.datos),
      imagenes: stackimg,
    });
    const guardar = await comidas.save();
    res.status(200).send(guardar);
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Error al guardar los datos" });
  }
}

function getComidas(req, res) {
  Comidas.find((error, comidasStored) => {
    if (error) {
      res.status(500).send({ msg: "No hay datos que consultar" });
    } else {
      res.status(200).send(comidasStored);
    }
  });
}

function getComidasByPuesto(req, res) {
  const { idpuesto } = req.params;
  Comidas.find({ "puesto._id": idpuesto }, (error, comidasStored) => {
    if (error) {
      res.status(500).send({ msg: "No hay datos que consultar" });
    } else {
      console.log(comidasStored);
      console.log(idpuesto);
      res.status(200).send(comidasStored);
    }
  });
}

function deleteComida(req, res) {
  const { id } = req.params;

  Comidas.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar comida" });
    } else {
      res.status(200).send({ msg: "Comida eliminada" });
    }
  });
}

function updateComidas(req, res) {
  const { id } = req.params;
  const datosComida = req.body;

  Comidas.findByIdAndUpdate({ _id: id }, datosComida, (error) => {
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
  createComidas,
  getComidas,
  deleteComida,
  updateComidas,
  getComidasByPuesto,
};
