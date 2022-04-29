import { addProduct, getProducts } from "../controllers/products.js";

import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  let productos = getProducts();
  res.render("home", {
    data: productos,
    products: productos.length !== 0 ? true : false,
  });
});

router.post("/", (req, res) => {
  addProduct(req.body);
  res.redirect("/productos");
});

export default router;
