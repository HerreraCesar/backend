import { MySQL, SQLite } from "./db/config.js";

import Container from "./controllers/container.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { engine } from "express-handlebars";
import { errors } from './controllers/errors.js';
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import router from "./routes/index.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsDB = new Container(MySQL, 'products')
const messagesDB = new Container(SQLite, 'messages')

productsDB.startProducts()
messagesDB.startMessages()

io.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");
  socket.emit("messages", await messagesDB.read('*'));
  socket.emit("products", await productsDB.read('*'))

  socket.on("addMessage", async function (data) {
    await messagesDB.write(data)
    io.sockets.emit("messages", await messagesDB.read('*'));
  });

  socket.on("addProduct", async function (data) {
    await productsDB.write(data)
    io.sockets.emit("products", await productsDB.read('*'));
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