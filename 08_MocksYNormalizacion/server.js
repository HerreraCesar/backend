import { messagesDB, productsDB } from "./db/index.js";
import { normalize, schema } from "normalizr";
import { Server } from "socket.io";
import { createServer } from "http";
import { engine } from "express-handlebars";
import { errors } from "./controllers/errors.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import router from "./routes/index.js";
import uniqid from "uniqid";
import { fakerProducts } from "./controllers/faker.js";
//import util from 'util'

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
  //console.log(util.inspect(normalizedMessages, false, 12, true))
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
