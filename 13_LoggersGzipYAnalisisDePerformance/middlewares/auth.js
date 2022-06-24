import { requestLogger } from "../server.js";

export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    requestLogger.info((`ruta ${req.baseUrl} metodo ${req.method} autorizada`))
    next();
  } else {
    requestLogger.info((`ruta ${req.baseUrl} metodo ${req.method} no autorizada`))
    //console.log(`ruta ${req.baseUrl} metodo ${req.method} no autorizada`);
    res.redirect("/login");
  }
};
