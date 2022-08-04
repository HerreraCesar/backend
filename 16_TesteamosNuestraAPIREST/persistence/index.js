import config from "../config.js";
import { requestLogger } from "../scripts/loggers.js";

let productsDB;
let messagesDB;
let usersDB;

requestLogger.info(`db seleccionada: ${config.arguments.database}`);

switch (config.arguments.database) {
  case "json":
    const { default: FilesProductsDao } = await import(
      "./daos/products/filesProductsDao.js"
    );
    const { default: FilesMessagesDao } = await import("./daos/messages/filesMessagesDao.js");
    const { default: FilesUsersDao } = await import("./daos/users/filesUsersDao.js");
    productsDB = FilesProductsDao.getInstance()
    messagesDB = FilesMessagesDao.getInstance();
    usersDB = FilesUsersDao.getInstance();
    
    const initialize = async () => {
      const products = await productsDB.getAll()
      const messages = await messagesDB.getAll()
      const users = await usersDB.getAll()
      if (products === undefined) {
        productsDB.write('[]')
      }
      if (messages === undefined) {
        messagesDB.write('[]')
      }
      if (users === undefined) {
        usersDB.write('[]')
      }
      return
    }
    initialize()
    break;

  case "mongo":
    const { default: MongoProductsDao } = await import(
      "./daos/products/mongoProductsDao.js"
    );
    const { default: MongoMessagesDao } = await import("./daos/messages/mongoMessagesDao.js");
    const { default: MongoUsersDao } = await import("./daos/users/mongoUsersDao.js");
    productsDB = MongoProductsDao.getInstance();
    messagesDB = MongoMessagesDao.getInstance();
    usersDB = MongoUsersDao.getInstance();
    break;

  default:
    const { default: MemoryProductsDao } = await import(
      "./daos/products/memoryProductsDao.js"
    );
    const { default: MemoryMessagesDao } = await import(
      "./daos/messages/memoryMessagesDao.js"
    );
    const { default: MemoryUsersDao } = await import(
      "./daos/users/memoryUsersDao.js"
    );
    productsDB = MemoryProductsDao.getInstance();
    messagesDB = MemoryMessagesDao.getInstance();
    usersDB = MemoryUsersDao.getInstance();
    break;
}

export { productsDB, messagesDB, usersDB };
