import {
  getInfo,
  getLogout,
  postLogin,
  postRegistration
} from "../controllers/main.js";

import { Router } from "express";
import compression from "compression";
import { isAuth } from "../middlewares/auth.js";
import passport from "passport";

const mainRouter = Router();

mainRouter.get("/", compression(), getInfo);
mainRouter.post("/login", passport.authenticate("login"), postLogin);
mainRouter.post("/registration", passport.authenticate("registration"), postRegistration);
mainRouter.get("/logout", isAuth, getLogout);


export default mainRouter;
