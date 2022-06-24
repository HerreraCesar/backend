// ------------- IMPORTACIONES ------------- //

import { addMessage, getMessages } from "./controllers/websockets.js";
import { productsDB, usersDB } from "./db/index.js";

import { Strategy as LocalStrategy } from "passport-local";
import MongoStore from "connect-mongo";
import { Server } from "socket.io";
import bcrypt from "bcrypt";
import cluster from 'node:cluster';
import compression from "compression";
import config from "./config.js";
import { cpus } from 'node:os';
import { createServer } from "http";
import { engine } from "express-handlebars";
import { errors } from "./controllers/errors.js";
import express from "express";
import { fakerProducts } from "./controllers/faker.js";
import { fileURLToPath } from "url";
import mainRouter from "./routes/mainRouter.js";
import passport from "passport";
import path from "path";
import process from 'node:process';
import session from "express-session";
import sessionRouter from "./routes/sessionRouter.js";
import uniqid from "uniqid";
import winston from "winston";

// ------------- INICIALIZANDO APP ------------- //
const app = express();
const httpServer = createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------- SESIONES ------------- //
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongodb.connectionString,
    }),
    resave: true,
    saveUninitialized: true,
    rolling: true,
    secret: "coder",
    cookie: {
      maxAge: 10 * 60 * 1000,
    },
  })
);

// ------------- LOGGERS ------------- //
export const requestLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({level: 'info'})
  ]
})

export const Logger404 = winston.createLogger({
  transports: [
    new winston.transports.Console({level: 'warn'}),
    new winston.transports.File({filename: './13_LoggersGzipYAnalisisDePerformance/logs/warn.log', level: 'warn'})
  ]
})

export const errorApiLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({level: 'error'}),
    new winston.transports.File({filename: './13_LoggersGzipYAnalisisDePerformance/logs/error.log', level: 'error'})
  ]
})

// ------------- PASSPORT ------------- //
app.use(passport.initialize());
app.use(passport.session());

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    let user = await usersDB.getByUser(username);
    if (user === false) {
      console.log("El usuario no existe");
      return done(null, false);
    }
    if (!isValidPassword(user, password)) {
      console.log("Contraseña incorrecta");
      return done(null, false);
    }
    return done(null, user);
  })
);

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use(
  "registration",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      let user = await usersDB.getByUser(username);
      if (user !== false) {
        console.log(`El usuario ${username} ya se encuentra registrado`);
        return done(null, false);
      }
      const newUser = {
        username: username,
        password: createHash(password),
      };
      await usersDB.write(newUser);
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  let user = await usersDB.getByUser(username);
  return done(null, user);
});

// ------------- WEBSOCKETS ------------- //
const io = new Server(httpServer);
io.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");
  const { normalizedMessages, compression } = await getMessages();
  socket.emit("messages", normalizedMessages, compression);
  socket.emit("products", await productsDB.getAll());
  socket.emit("products-test", await fakerProducts(5));

  socket.on("addMessage", async function (data) {
    const { normalizedMessages, compression } = await addMessage(data);
    io.sockets.emit("messages", normalizedMessages, compression);
  });

  socket.on("addProduct", async function (data) {
    let product = { ...data, id: uniqid() };
    await productsDB.write(product);
    io.sockets.emit("products", await productsDB.getAll());
  });
});

// ------------- VISTAS ------------- //
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));

// ------------- RUTAS ------------- //
app.use("/api", mainRouter);
app.use("/", sessionRouter);
app.use('/info', compression(), (req, res) => {
  requestLogger.info((`ruta ${req.baseUrl} metodo ${req.method} autorizada`))
  res.send({
    'Argumentos de entrada:': config.arguments,
    'Nombre de la plataforma:': config.variables.platform,
    'Versión de Node.js:': config.variables.node,
    'Memoria total reservada:': config.variables.memory,
    'Path de ejecución:': config.variables.path,
    'Process id:': config.variables.id,
    'Carpeta del proyecto:': config.variables.folder,
    'Procesadores': config.variables.processors
  })
})
app.use('/info-console', compression(), (req, res) => {
  requestLogger.info((`ruta ${req.baseUrl} metodo ${req.method} autorizada`))
  let response = {
    'Argumentos de entrada:': config.arguments,
    'Nombre de la plataforma:': config.variables.platform,
    'Versión de Node.js:': config.variables.node,
    'Memoria total reservada:': config.variables.memory,
    'Path de ejecución:': config.variables.path,
    'Process id:': config.variables.id,
    'Carpeta del proyecto:': config.variables.folder,
    'Procesadores': config.variables.processors
  }
  console.log(response);
  res.send(response)
})
app.use("*", errors);

// ------------- INICIALIZANDO SERVIDOR ------------- //
if (config.arguments.mode === 'cluster') {
  // ------------- CLUSTERS ------------- //
  const numCPUs = cpus().length;

  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });

  } else {

    const server = httpServer.listen(config.arguments.port, () => {
      console.log(
        `Servidor http con websockets escuchando en el puerto ${
          server.address().port
        }`
      );
    });
    server.on("error", (error) => console.log(`Error en el servidor ${error}`));

    console.log(`Worker ${process.pid} started`);
  }
} else {
  const server = httpServer.listen(config.arguments.port, () => {
    console.log(
      `Servidor http con websockets escuchando en el puerto ${
        server.address().port
      }`
    );
  });
  server.on("error", (error) => console.log(`Error en el servidor ${error}`));
}

/* const server = httpServer.listen(config.arguments.port, () => {
  console.log(
    `Servidor http con websockets escuchando en el puerto ${
      server.address().port
    }`
  );
});
server.on("error", (error) => console.log(`Error en el servidor ${error}`)); */