import config from "../../config.js";
import { errorApiLogger } from "../../scripts/loggers.js";
import mongoose from "mongoose";

class MongoContainer {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async init() {
    await mongoose.connect(config.mongodb.connectionString)
  }

  async disconnect() {
    await mongoose.disconnect()
  }

  async getAll() {
    try {
      return await this.collection.find();
    } catch (error) {
      errorApiLogger.error(error);
    }
  }

  async write(data) {
    try {
      await this.collection.create(data);
      return "Escrito correctamente";
    } catch (error) {
      errorApiLogger.error(error);
    }
  }

  async getByUser(user) {
    try {
      const content = await this.getAll();
      const index = content.findIndex((register) => register.username === user);
      if (index === -1) {
        return false;
      }
      return content[index];
    } catch (error) {
      errorApiLogger.error(error);
    }
  }
}

export default MongoContainer;
