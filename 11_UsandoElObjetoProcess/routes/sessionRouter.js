import { Router } from "express";
import passport from "passport";

const sessionRouter = Router();

// ------------- LOGIN ------------- //
sessionRouter.get("/login", (req, res) => {
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
  const error = "Login error";
  res.render("error", { error });
});

// ------------- REGISTRATION ------------- //
sessionRouter.get("/registration", (req, res) => {
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
  const error = "Registration error";
  res.render("error", { error });
});

// ------------- LOGOUT ------------- //
sessionRouter.get("/logout", async (req, res) => {
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
