import { messagesDB, productsDB } from "../persistence/index.js";
import { normalize, schema } from "normalizr";

import { fakerProducts } from "./faker.js";
import uniqid from "uniqid";

// ------------- NORMALIZR ------------- //
const author = new schema.Entity("author", {}, { idAttribute: "email" });
const message = new schema.Entity(
  "message",
  { author: author },
  { idAttribute: "_id" }
);
const messagesArray = [message];

// ------------- GESTION MENSAJES ------------- //
const getMessages = async () => {
  let messages = await messagesDB.getAll();
  const messagesReady = [];
  messages.map((message) => messagesReady.push(message._doc));
  const normalizedMessages = normalize(messagesReady, messagesArray);
  let compression = (
    (JSON.stringify(normalizedMessages).length /
      JSON.stringify(messagesReady).length) *
    100
  ).toFixed(2);

  return { normalizedMessages, compression };
};

const addMessage = async (data) => {
  await messagesDB.write(data);
  return getMessages();
};

export const websocket = async (socket) => {
  console.log("Un cliente se ha conectado");
  const { normalizedMessages, compression } = await getMessages();
  socket.emit("messages", normalizedMessages, compression);
  socket.emit("products", await productsDB.getAll());
  socket.emit("test", await fakerProducts(5));

  socket.on("addMessage", async function (data) {
    const { normalizedMessages, compression } = await addMessage(data);
    io.sockets.emit("messages", normalizedMessages, compression);
  });

  socket.on("addProduct", async function (data) {
    let product = { ...data, id: uniqid() };
    await productsDB.write(product);
    io.sockets.emit("products", await productsDB.getAll());
  });
};
