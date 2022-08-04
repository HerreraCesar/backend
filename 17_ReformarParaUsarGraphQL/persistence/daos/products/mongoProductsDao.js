import MongoContainer from "../../containers/mongoContainer.js";

let instance = null

class MongoProductsDao extends MongoContainer {
  constructor() {
    super("products", {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        thumbnail: { type: String, required: true },
        id: { type: String, required: true },
        timestamp: { type: Number, required: true },
      });
  }
  static getInstance() {
    if (!instance) {
      instance = new MongoProductsDao
    }
    return instance
  }
}

export default MongoProductsDao;