// ------------- IMPORTS ------------- //

import { clusterServer, forkServer } from "./scripts/cluster.js";
import {
  deserialize,
  loginStrategy,
  registationStrategy,
  serialize,
} from "./scripts/strategies.js";

import { Server } from "socket.io";
import apiRouter from "./routes/api.js";
import config from "./config.js";
import { createServer } from "http";
import { engine } from "express-handlebars";
import { errors } from "./scripts/errors.js";
import express from "express";
import { fileURLToPath } from "url";
import mainRouter from "./routes/main.js";
import passport from "passport";
import path from "path";
import session from "express-session";
import { websocket } from "./scripts/websocket.js";

// ------------- EXPRESS ------------- //
const app = express();
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

// ------------- WEBSOCKETS ------------- //
export const httpServer = createServer(app);
const io = new Server(httpServer);
io.on("connection", websocket);

// ------------- VIEWS ------------- //
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));

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
