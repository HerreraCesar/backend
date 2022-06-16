import { normalize, schema } from "normalizr";

import { messagesDB } from "../db/index.js";

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

export { addMessage, getMessages };
