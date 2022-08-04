import config from "../config.js";
import { requestLogger } from "../scripts/loggers.js";

const postLogin = async (req, res) => {
  res.send({message: `Bienvenido ${req.user.username}`});
}

const postRegistration = async (req, res) => {
  res.send({message: `El usuario ${req.user.username} fue registrado exitosamente`});
};

const getLogout = async (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  let user = await req.session.passport.user;
  req.logout((error) => {
    if (!error) {
      res.send({message: `Hasta luego ${user}`});
    } else {
      res.send({ status: "Logout ERROR", body: error });
    }
  });
};

const getInfo = async (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  res.send({
    "Argumentos de entrada:": config.arguments,
    "Nombre de la plataforma:": config.variables.platform,
    "Versión de Node.js:": config.variables.node,
    "Memoria total reservada:": config.variables.memory,
    "Path de ejecución:": config.variables.path,
    "Process id:": config.variables.id,
    "Carpeta del proyecto:": config.variables.folder,
    Procesadores: config.variables.processors,
  });
};

export {
  postLogin,
  postRegistration,
  getLogout,
  getInfo
};
