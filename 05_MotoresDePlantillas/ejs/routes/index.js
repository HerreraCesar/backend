import { addProduct, getProducts } from "../controllers/products.js";

import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", { data: getProducts() });
});

router.post("/", (req, res) => {
  addProduct(req.body);
  res.redirect("/productos");
});

export default router;
