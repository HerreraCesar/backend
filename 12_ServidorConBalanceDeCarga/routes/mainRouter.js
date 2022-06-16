import { Router } from "express";
import config from "../config.js";
import { fork } from 'child_process';
import { isAuth } from "../middlewares/auth.js";

const mainRouter = Router();

mainRouter.get("/", isAuth, async (req, res) => {
  res.render("home", { user: await req.session.passport.user });
});

mainRouter.get("/productos-test", async (req, res) => {
  res.render("home");
});


mainRouter.get('/randoms', (req, res) => {
  const quantity = req.query.cant ? parseInt(req.query.cant) : 100000000
  const calculation = fork('./11_UsandoElObjetoProcess/controllers/calculation.js')
  calculation.send(quantity)
  calculation.on('message', (result) => {
    res.send([result, config.arguments.port])
  })
})

export default mainRouter;
