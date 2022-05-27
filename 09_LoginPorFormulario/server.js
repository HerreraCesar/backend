import { messagesDB, productsDB } from "./db/index.js";
import { normalize, schema } from "normalizr";

import MongoStore from "connect-mongo";
import { Server } from "socket.io";
import config from "./db/config.js";
import { createServer } from "http";
import { engine } from "express-handlebars";
import { errors } from "./controllers/errors.js";
import express from "express";
import { fakerProducts } from "./controllers/faker.js";
import { fileURLToPath } from "url";
import path from "path";
import router from "./routes/index.js";
import session from "express-session";
import uniqid from "uniqid";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const author = new schema.Entity("author", {}, { idAttribute: "email" });
const message = new schema.Entity(
  "message",
  {
    author: author,
  },
  { idAttribute: "_id" }
);
const messagesArray = [message];

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
      maxAge: 60000,
    },
  })
);

io.on("connection", async (socket) => {
  let messages = await messagesDB.getAll();
  const messagesReady = [];
  messages.map((message) => messagesReady.push(message._doc));
  const normalizedMessages = normalize(messagesReady, messagesArray);
  let compression = (
    (JSON.stringify(normalizedMessages).length /
      JSON.stringify(messagesReady).length) *
    100
  ).toFixed(2);
  console.log("Un cliente se ha conectado");
  socket.emit("messages", normalizedMessages, compression);
  socket.emit("products", await productsDB.getAll());
  socket.emit("products-test", await fakerProducts(5));

  socket.on("addMessage", async function (data) {
    await messagesDB.write(data);
    let messages = await messagesDB.getAll();
    const messagesReady = [];
    messages.map((message) => messagesReady.push(message._doc));
    const normalizedMessages = normalize(messagesReady, messagesArray);
    let compression = (
      (JSON.stringify(normalizedMessages).length /
        JSON.stringify(messagesReady).length) *
      100
    ).toFixed(2);
    io.sockets.emit("messages", normalizedMessages, compression);
  });

  socket.on("addProduct", async function (data) {
    let product = { ...data, id: uniqid() };
    await productsDB.write(product);
    io.sockets.emit("products", await productsDB.getAll());
  });
});

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  req.session.name = req.body.name;
  res.redirect("/api");
});

app.get("/logout", (req, res) => {
  let user = req.session.name;
  req.session.destroy((error) => {
    if (!error) {
      res.render("logout", { user: user });
    } else {
      res.send({ status: "Logout ERROR", body: error });
    }
  });
});

app.use("*", errors);

const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http con websockets escuchando en el puerto ${
      server.address().port
    }`
  );
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));
