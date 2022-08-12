import { Logger404 } from "./loggers.js";

export const errors = (ctx) => {
  Logger404.warn(`ruta ${ctx.req.url} metodo ${ctx.req.method} no autorizada`);
  ctx.body = {
    status: 'error',
    data: {
      error: -2,
      description: `ruta ${ctx.req.url} metodo ${ctx.req.method} no autorizada`,
    }
  }
};
