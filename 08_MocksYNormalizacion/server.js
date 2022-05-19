import { messagesDB, productsDB } from "./db/index.js";

import { Server } from "socket.io";
import { createServer } from "http";
import { engine } from "express-handlebars";
import { errors } from './controllers/errors.js';
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import router from "./routes/index.js";
import uniqid from "uniqid";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

io.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");
  socket.emit("messages", await messagesDB.getAll());
  socket.emit("products", await productsDB.getAll())

  socket.on("addMessage", async function (data) {
    await messagesDB.write(data)
    io.sockets.emit("messages", await messagesDB.getAll());
  });

  socket.on("addProduct", async function (data) {
    let product = {...data, id: uniqid()}
    await productsDB.write(product)
    io.sockets.emit("products", await productsDB.getAll());
  });
});

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router)
app.use('*', errors)

const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http con websockets escuchando en el puerto ${
      server.address().port
    }`
  );
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));

