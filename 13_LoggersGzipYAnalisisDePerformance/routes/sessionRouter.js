import { Router } from "express";
import { isAuth } from "../middlewares/auth.js";
import passport from "passport";
import { requestLogger } from "../server.js";

const sessionRouter = Router();

// ------------- LOGIN ------------- //
sessionRouter.get("/login", (req, res) => {
  requestLogger.info((`ruta ${req.url} metodo ${req.method} autorizada`))
  res.render("login");
});
sessionRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/loginError",
    successRedirect: "/api",
  })
);
sessionRouter.get("/loginError", (req, res) => {
  requestLogger.info((`ruta ${req.url} metodo ${req.method} autorizada`))
  const error = "Login error";
  res.render("error", { error });
});

// ------------- REGISTRATION ------------- //
sessionRouter.get("/registration", (req, res) => {
  requestLogger.info((`ruta ${req.url} metodo ${req.method} autorizada`))
  res.render("registration");
});
sessionRouter.post(
  "/registration",
  passport.authenticate("registration", {
    failureRedirect: "/registrationError",
    successRedirect: "/api",
  })
);
sessionRouter.get("/registrationError", (req, res) => {
  requestLogger.info((`ruta ${req.url} metodo ${req.method} autorizada`))
  const error = "Registration error";
  res.render("error", { error });
});

// ------------- LOGOUT ------------- //
sessionRouter.get("/logout", isAuth, async (req, res) => {
  requestLogger.info((`ruta ${req.url} metodo ${req.method} autorizada`))
  let user = await req.session.passport.user;
  req.logout((error) => {
    if (!error) {
      res.render("logout", { user: user });
    } else {
      res.send({ status: "Logout ERROR", body: error });
    }
  });
});

export default sessionRouter;
