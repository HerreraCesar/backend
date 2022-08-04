import {
  addProduct,
  deleteProduct,
  getProducts,
  getRandomProducts,
  getTestProducts,
  updateProduct,
} from "../controllers/api.js";

import { Router } from "express";

const apiRouter = Router();

apiRouter.get("/products/:id?", getProducts);
apiRouter.get("/test", getTestProducts);
apiRouter.get("/random", getRandomProducts);
apiRouter.post("/products", addProduct)
apiRouter.delete("/products", deleteProduct)
apiRouter.put("/products", updateProduct)

export default apiRouter;
