class MemoryContainer {
  constructor() {
    this.elementos = [];
  }

  getAll() {
    return this.elementos;
  }

  write(data) {
    this.elementos.push(data);
    return "Escrito correctamente";
  }

  getById(id) {
    const content = this.getAll();
    const index = content.findIndex((register) => register.id === id);
    if (index === -1) {
      return false;
    }
    return content[index];
  }
}

export default MemoryContainer;
