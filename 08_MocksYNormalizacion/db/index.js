import Container from "../controllers/container.js";

const productsSchema = {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    id: { type: String, required: true },
    timestamp: { type: Number, required: true }
}

const messagesSchema = {
    author: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Number, required: true }
}

const productsDB = new Container('products', productsSchema)
const messagesDB = new Container('messages', messagesSchema)

export { productsDB, messagesDB };