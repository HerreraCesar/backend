import {
  getInfo,
} from "../controllers/main.js";

import { Router } from "express";

const mainRouter = Router();

mainRouter.get("/", getInfo);


export default mainRouter;
