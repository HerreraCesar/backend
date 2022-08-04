import config from "../../config.js";
import { errorApiLogger } from "../../scripts/loggers.js";
import mongoose from "mongoose";

mongoose.connect(config.mongodb.connectionString)

class MongoContainer {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
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
      return {message: "Registro escrito correctamente", data: data};
    } catch (error) {
      errorApiLogger.error(error);
    }
  }

  async deleteById(id) {
    try {
      const content = await this.getAll();
      const index = content.findIndex((register) => register.id === id);
      if (index === -1) {
        return {message: "Registro no encontrado", id: id};
      }
      await this.collection.deleteOne({ id: id });
      return {message: `El registro con id ${id} ha sido eliminado correctamente`, data: content[index]};
    } catch (error) {
      errorApiLogger.error(error);
    }
  }

  async getById(id) {
    try {
      const content = await this.getAll();
      const index = content.findIndex((register) => register.id === id);
      if (index === -1) {
        return {message: "Registro no encontrado", id: id};
      }
      return content[index];
    } catch (error) {
      errorApiLogger.error(error);
    }
  }

  async updateById(id, newData) {
    try {
      const content = await this.getAll();
      const index = content.findIndex((register) => register.id === id);
      if (index === -1) {
        return {message: "Registro no encontrado", id: id};
      }
      const timestamp = content[index].timestamp;
      const registry = { ...newData, id, timestamp };
      await this.collection.replaceOne({ id: id }, registry);
      return {message: `El registro con id ${id} ha sido actualizado correctamente`, data: content[index]}
    } catch (error) {
      errorApiLogger.error(error);
    }
  }
}

export default MongoContainer;
