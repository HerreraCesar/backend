import FilesContainer from '../../containers/filesContainer.js'

let instance = null
class FilesProductsDao extends FilesContainer {
    constructor() {
      super("./15_MejorarLaArquitecturaDeNuestraAPI/db/products.json");
    }
    static getInstance() {
      if (!instance) {
        instance = new FilesProductsDao
      }
      return instance
    }
    
  }
  
  export default FilesProductsDao;