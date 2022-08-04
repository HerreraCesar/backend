import config from "../config.js";
import {fakerProducts} from '../scripts/faker.js'
import { fork } from "child_process";
import { productsDB } from "../persistence/index.js";
import { requestLogger } from "../scripts/loggers.js";

const getProducts = async (req, res) => {
  const content = await productsDB.getAll()
  res.send(content);
};

const getTestProducts = async (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  const content = await fakerProducts(5)
  res.send(content);
};

const getRandomProducts = async (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  const quantity = req.query.cant ? parseInt(req.query.cant) : 100000000;
  const calculation = fork(
    "./16_TesteamosNuestraAPIREST/scripts/calculation.js"
  );
  calculation.send(quantity);
  calculation.on("message", (result) => {
    res.send([result, config.arguments.port]);
  });
};

export { getProducts, getTestProducts, getRandomProducts };
