import MongoContainer from "../../containers/mongoContainer.js";

let instance = null

class MongoUsersDao extends MongoContainer {
  constructor() {
    super("users", {
      id: { type: String, required: true },
      password: { type: String, required: true },
    });
  }
  static getInstance() {
    if (!instance) {
      instance = new MongoUsersDao
    }
    return instance
  }
}

export default MongoUsersDao;
