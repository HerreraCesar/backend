import MemoryContainer from "../../containers/memoryContainer.js";

let instance = null

class MemoryMessagesDao extends MemoryContainer {
    static getInstance() {
        if (!instance) {
          instance = new MemoryMessagesDao
        }
        return instance
      }
}

export default MemoryMessagesDao;
