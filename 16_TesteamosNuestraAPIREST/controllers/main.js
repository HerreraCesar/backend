import config from "../config.js";
import passport from "passport";
import { requestLogger } from "../scripts/loggers.js";

const getHome = async (req, res) => {
  res.redirect("/login");
};

const getLogin = async (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  res.render("login");
};

const postLogin = passport.authenticate("login", {
  successRedirect: "/api/products",
  failureRedirect: "/error",
});

const getRegistration = async (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  res.render("registration");
};

const postRegistration = passport.authenticate("registration", {
  successRedirect: "/api",
  failureRedirect: "/error",
});

const getLogout = async (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  let user = await req.session.passport.user;
  req.logout((error) => {
    if (!error) {
      res.render("logout", { user: user });
    } else {
      res.send({ status: "Logout ERROR", body: error });
    }
  });
};

const getError = async (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  res.render("error", { error: "error" });
};

const getInfo = async (req, res) => {
  requestLogger.info(`ruta ${req.baseUrl} metodo ${req.method} autorizada`);
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
  getHome,
  getLogin,
  postLogin,
  getRegistration,
  postRegistration,
  getLogout,
  getError,
  getInfo,
};
