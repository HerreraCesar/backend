import { Router } from "express";
import { isAuth } from "../middlewares/auth.js";

const mainRouter = Router();

mainRouter.get("/", isAuth, async (req, res) => {
  res.render("home", { user: await req.session.passport.user });
});

mainRouter.get("/productos-test", async (req, res) => {
  res.render("home");
});

export default mainRouter;
