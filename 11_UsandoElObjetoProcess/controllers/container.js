import config from "../config.js";
import mongoose from "mongoose";

await mongoose.connect(config.mongodb.connectionString);

class Container {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async getAll() {
    try {
      return await this.collection.find();
    } catch (error) {
      console.log(error);
    }
  }

  async write(data) {
    try {
      await this.collection.create(data);
      return "Escrito correctamente";
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }
}

export default Container;
