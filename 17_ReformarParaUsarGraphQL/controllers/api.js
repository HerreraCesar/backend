import config from "../config.js";
import {fakerProducts} from '../scripts/faker.js'
import { fork } from "child_process";
import { productsDB } from "../persistence/index.js";
import { requestLogger } from "../scripts/loggers.js";
import uniqid from 'uniqid'

const getProducts = async (req, res) => {
  if (req.params.id) {
    const id = req.params.id;
    const content = await productsDB.getById(id);
    res.send(content);
  } else {
    const content = await productsDB.getAll()
    res.send(content);
  }
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

const addProduct = async (req, res) => {
  const newProduct = { ...req.body, id: uniqid(), timestamp: new Date().valueOf()};
  const content = await productsDB.write(newProduct)
  res.send(content)
}

const deleteProduct = async (req, res) => {
  const content = await productsDB.deleteById(req.body.id)
  res.send(content)
}

const updateProduct = async (req, res) => {
  const id = req.body.id;
  const updatedProduct = req.body.data;
  const content = await productsDB.updateById(id, updatedProduct);
  res.send(content);
}



export { getProducts, getTestProducts, getRandomProducts, addProduct, deleteProduct, updateProduct };
