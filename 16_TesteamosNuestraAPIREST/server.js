// ------------- IMPORTS ------------- //

import { clusterServer, forkServer } from "./scripts/cluster.js";
import {
  deserialize,
  loginStrategy,
  registationStrategy,
  serialize,
} from "./scripts/strategies.js";

import apiRouter from "./routes/api.js";
import config from "./config.js";
import { errors } from "./scripts/errors.js";
import express from "express";
import mainRouter from "./routes/main.js";
import passport from "passport";
import session from "express-session";

// ------------- EXPRESS ------------- //
export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------- SESSIONS ------------- //
app.use(session(config.session));

// ------------- PASSPORT ------------- //
app.use(passport.initialize());
app.use(passport.session());
passport.use("login", loginStrategy);
passport.use("registration", registationStrategy);
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);

// ------------- ROUTES ------------- //
app.use("/", mainRouter);
app.use("/api", apiRouter);
app.use("*", errors);

// ------------- SERVER ------------- //
if (config.arguments.mode === "cluster") {
  clusterServer();
} else {
  forkServer();
}
