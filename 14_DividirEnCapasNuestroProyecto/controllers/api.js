import config from "../config.js";
import { fork } from "child_process";
import { requestLogger } from "../scripts/loggers.js";

const getProducts = async (req, res) => {
  res.render("home", { user: await req.session.passport.user });
};

const getTestProducts = async (req, res) => {
  requestLogger.info(`ruta ${req.baseUrl} metodo ${req.method} autorizada`);
  res.render("home");
};

const getRandomProducts = async (req, res) => {
  requestLogger.info(`ruta ${req.baseUrl} metodo ${req.method} autorizada`);
  const quantity = req.query.cant ? parseInt(req.query.cant) : 100000000;
  const calculation = fork(
    "14_DividirEnCapasNuestroProyecto/scripts/calculation.js"
  );
  calculation.send(quantity);
  calculation.on("message", (result) => {
    res.send([result, config.arguments.port]);
  });
};

export { getProducts, getTestProducts, getRandomProducts };
