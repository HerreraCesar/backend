import {
  getError,
  getHome,
  getInfo,
  getLogin,
  getLogout,
  getRegistration,
  postLogin,
  postRegistration,
} from "../controllers/main.js";

import { Router } from "express";
import compression from "compression";
import { isAuth } from "../middlewares/auth.js";

const mainRouter = Router();

mainRouter.get("/", getHome);
mainRouter.get("/login", getLogin);
mainRouter.post("/login", postLogin);
mainRouter.get("/registration", getRegistration);
mainRouter.post("/registration", postRegistration);
mainRouter.get("/logout", isAuth, getLogout);
mainRouter.get("/error", getError);
mainRouter.get("/info", compression(), getInfo);

export default mainRouter;
