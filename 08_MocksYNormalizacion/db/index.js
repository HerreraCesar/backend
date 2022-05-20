import Container from "../controllers/container.js";

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

const productsDB = new Container("products", productsSchema);
const messagesDB = new Container("messages", messagesSchema);

export { productsDB, messagesDB };
