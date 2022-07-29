import MemoryContainer from "../../containers/memoryContainer.js";

let instance = null

class MemoryUsersDao extends MemoryContainer {
    static getInstance() {
        if (!instance) {
          instance = new MemoryUsersDao
        }
        return instance
      }
}

export default MemoryUsersDao;
