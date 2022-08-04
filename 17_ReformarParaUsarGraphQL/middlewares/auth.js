import { requestLogger } from "../scripts/loggers.js";

export const isAuth = (req, res, next) => {
  console.log(req);
  if (req.isAuthenticated()) {
    requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
    next();
  } else {
    requestLogger.info(
      `ruta ${req.url} metodo ${req.method} no autorizada`
    );
    res.send({error: "El usuario no cuenta con una sesión activa"});
  }
};
