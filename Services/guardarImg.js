const path = require("path");
function guardarImg(file, nombreArchivo, carpeta) {
  try {
    const extArchivo = file.mimetype.replace("image/", "");
    const nSave = `${nombreArchivo}.${extArchivo}`;
    const pathSave = path.join(
      __dirname,
      "../public/assets",
      `${carpeta}/`,
      nSave
    );
    file.mv(pathSave, (err) => {
      if (err) throw { msg: "Error al cargar imagen" };
    });
    return extArchivo;
  } catch (error) {
    return error;
  }
}

module.exports = guardarImg;
