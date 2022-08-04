import * as fs from "fs";

import { errorApiLogger } from "../../scripts/loggers.js";

class FilesContainer {
  constructor(filename) {
    this.filename = filename;
  }

  async write(data) {
    try {
      await fs.promises.writeFile(this.filename, JSON.stringify(data));
      return "Escrito correctamente";
    } catch (error) {
      errorApiLogger.error(error);
    }
  }

  async add(data) {
    try {
      const content = await this.getAll()
      content.push(data)
      await fs.promises.writeFile(this.filename, JSON.stringify(content));
      return "Escrito correctamente";
    } catch (error) {
      errorApiLogger.error(error);
    }
  }

  async getAll() {
    try {
      return JSON.parse(await fs.promises.readFile(this.filename, "utf-8"));
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

export default FilesContainer;
