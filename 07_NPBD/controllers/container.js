class Container {
  constructor(db, table) {
    this.db = db;
    this.table = table;
  }

  startProducts() {
    const database = this.db
    const table = this.table
    database.schema
      .hasTable(table)
      .then(function (exists) {
        if (!exists) {
          database.schema
          .createTable(table, (table) => {
            table.increments("id");
            table.string("title");
            table.integer("price");
            table.string("thumbnail");
          })
          .then(() => console.log("Tabla creada"))
          .catch((error) => console.log(error));
        }
        else {
          database.schema
            .dropTable(table)
            .then(() => console.log("Tabla eliminada"))
            .catch((error) => console.log(error))
          database.schema
            .createTable(table, (table) => {
              table.increments("id");
              table.string("title");
              table.integer("price");
              table.string("thumbnail");
            })
            .then(() => console.log("Tabla creada"))
            .catch((error) => console.log(error));
        };
      })
  }

  startMessages() {
    const database = this.db
    const table = this.table
    database.schema
      .hasTable(table)
      .then(function (exists) {
        if (!exists) {
          database.schema
          .createTable(table, (table) => {
            table.string('author');
            table.string('timestamp');
            table.string('text');
          })
          .then(() => console.log("Tabla creada"))
          .catch((error) => console.log(error));
        }
        else {
          database.schema
            .dropTable(table)
            .then(() => console.log("Tabla eliminada"))
            .catch((error) => console.log(error));
          database.schema
            .createTable(table, (table) => {
              table.string('author');
              table.string('timestamp');
              table.string('text');
            })
            .then(() => console.log("Tabla creada"))
            .catch((error) => console.log(error));
        }
      });
  }

  async read(columns) {
    const data = await this.db
      .from(this.table)
      .select(columns)
      .then((result) => {
        return result;
      })
      .catch((error) => console.log(error));

    return data;
  }

  async write(data) {
    await this.db(this.table)
      .insert(data)
      .then((result) => {
        return result;
      })
      .catch((error) => console.log(error));
    return "Escrito correctamente";
  }
}

export default Container;
