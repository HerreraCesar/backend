import KoaRouter from "koa-router";
import { getInfo } from "../controllers/main.js";

const mainRouter = new KoaRouter();

mainRouter.get("/", getInfo);

export default mainRouter;
