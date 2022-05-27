import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  let user = await req.session.name;
  if (user) {
    res.render("home", { user: user });
  } else {
    res.redirect("/login");
  }
});

router.get("/productos-test", async (req, res) => {
  res.render("home");
});

export default router;
