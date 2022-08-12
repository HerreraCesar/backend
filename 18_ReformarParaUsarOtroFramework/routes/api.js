import {
  getProducts,
  getTestProducts,
} from "../controllers/api.js";

import KoaRouter from "koa-router";

const apiRouter = new KoaRouter({
  prefix: '/api'
});

apiRouter.get("/products", getProducts);
apiRouter.get("/test", getTestProducts);

export default apiRouter;
