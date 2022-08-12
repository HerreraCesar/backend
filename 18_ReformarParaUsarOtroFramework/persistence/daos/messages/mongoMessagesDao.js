import MongoContainer from "../../containers/mongoContainer.js";

let instance = null

class MongoMessagesDao extends MongoContainer {
  constructor() {
    super("messages", {
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
    });
  }
  static getInstance() {
    if (!instance) {
      instance = new MongoMessagesDao
    }
    return instance
  }
}

export default MongoMessagesDao;
