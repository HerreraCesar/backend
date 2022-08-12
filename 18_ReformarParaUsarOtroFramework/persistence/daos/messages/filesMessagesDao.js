import FilesContainer from '../../containers/filesContainer.js'

let instance = null

class FilesMessagesDao extends FilesContainer {
    constructor() {
      super("./15_MejorarLaArquitecturaDeNuestraAPI/db/messages.json");
    }
    static getInstance() {
      if (!instance) {
        instance = new FilesMessagesDao
      }
      return instance
    }
  }
  
  export default FilesMessagesDao;