import MemoryContainer from "../../containers/memoryContainer.js";

let instance = null

class MemoryProductsDao extends MemoryContainer {
    static getInstance() {
        if (!instance) {
          instance = new MemoryProductsDao
        }
        return instance
      }
}

export default MemoryProductsDao;
