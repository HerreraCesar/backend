import config from "../config.js";
import { requestLogger } from "../scripts/loggers.js";

export const getInfo = async (ctx) => {
  requestLogger.info(`ruta ${ctx.req.url} metodo ${ctx.req.method} autorizada`);
  ctx.body = {
    status: 'success',
    data: {
      "Argumentos de entrada:": config.arguments,
      "Nombre de la plataforma:": config.variables.platform,
      "Versión de Node.js:": config.variables.node,
      "Memoria total reservada:": config.variables.memory,
      "Path de ejecución:": config.variables.path,
      "Process id:": config.variables.id,
      "Carpeta del proyecto:": config.variables.folder,
      "Procesadores": config.variables.processors,
    }
  }
};

