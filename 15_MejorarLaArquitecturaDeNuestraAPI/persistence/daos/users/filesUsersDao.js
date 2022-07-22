import FilesContainer from "../../containers/filesContainer.js";

let instance = null

class FilesUsersDao extends FilesContainer {
  constructor() {
    super("./db/users.json");
  }
  static getInstance() {
    if (!instance) {
      instance = new FilesUsersDao
    }
    return instance
  }
}

export default FilesUsersDao;
