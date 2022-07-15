import MongoDB from "./mongoDB.js";

const productsSchema = {
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  id: { type: String, required: true },
  timestamp: { type: Number, required: true },
};

const messagesSchema = {
  author: {
    email: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  text: { type: String, required: true },
  timestamp: { type: Number, required: true },
};

const usersSchema = {
  username: { type: String, required: true },
  password: { type: String, required: true },
};

const productsDB = new MongoDB("products", productsSchema);
const messagesDB = new MongoDB("messages", messagesSchema);
const usersDB = new MongoDB("users", usersSchema);

export { productsDB, messagesDB, usersDB };
