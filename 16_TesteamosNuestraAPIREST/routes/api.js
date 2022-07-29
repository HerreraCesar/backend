import {
  getProducts,
  getRandomProducts,
  getTestProducts,
} from "../controllers/api.js";

import { Router } from "express";
import { isAuth } from "../middlewares/auth.js";

const apiRouter = Router();

apiRouter.get("/products", isAuth, getProducts);
apiRouter.get("/test", getTestProducts);
apiRouter.get("/random", getRandomProducts);

export default apiRouter;
