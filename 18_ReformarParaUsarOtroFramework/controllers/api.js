import {fakerProducts} from '../scripts/faker.js'
import { productsDB } from "../persistence/index.js";
import { requestLogger } from "../scripts/loggers.js";

const getProducts = async (ctx) => {
  const content = await productsDB.getAll()
  ctx.body = {
    status: 'success',
    data: content
  }
};

const getTestProducts = async (ctx) => {
  requestLogger.info(`ruta ${ctx.req.url} metodo ${ctx.req.method} autorizada`);
  const content = await fakerProducts(5)
  ctx.body = {
    status: 'success',
    data: content
  }
};

export { getProducts, getTestProducts };
