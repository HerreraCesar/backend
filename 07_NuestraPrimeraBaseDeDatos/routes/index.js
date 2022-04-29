//import { addProduct, getProducts } from "../controllers/products.js";

import Container from "../controllers/container.js";
import { Router } from "express";
import { knexProducts } from "../db/config.js";

const router = Router();
const products = new Container(knexProducts, 'products')

products.start()
.then(
console.log(products.getAll()))
/* router.get("/", async (req, res) => {
  let productos = await products.getAll();
  console.log(productos);
  res.render("home", {
    data: productos,
    products: productos.length !== 0 ? true : false,
  });
}); */

/* router.post("/", (req, res) => {
  addProduct(req.body);
  res.redirect("/productos");
}); */

export default router;