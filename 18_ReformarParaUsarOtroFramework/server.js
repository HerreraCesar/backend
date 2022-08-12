// ------------- IMPORTS ------------- //

import { clusterServer, forkServer } from "./scripts/cluster.js";

import Koa from 'koa';
import apiRouter from "./routes/api.js";
import config from "./config.js";
import { errors } from "./scripts/errors.js";
import koaBody from "koa-body";
import mainRouter from "./routes/main.js";
import session from "koa-session";

// ------------- KOA ------------- //
export const app = new Koa()
app.use(koaBody())

// ------------- SESSIONS ------------- //
app.use(session(app));

// ------------- ROUTES ------------- //
app.use(mainRouter.routes())
app.use(apiRouter.routes());
app.use(errors);

// ------------- SERVER ------------- //
if (config.arguments.mode === "cluster") {
  clusterServer();
} else {
  forkServer();
}
