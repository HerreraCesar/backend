class Container {

    constructor(knex, table) {
        this.knex = knex;
        this.table = table
    }

    async start() {
        await this.knex.schema.dropTable(this.table)
        .then((result) => console.log('Tabla eliminada', result))
        .catch( error => console.log(error))
        await this.knex.schema.createTable(this.table, table => {
            table.increments('id')
            table.string('title')
            table.integer('price')
            table.string('thumbnail')
        })
        .then((result) => console.log('Tabla creada', result))
        .catch( error => console.log(error))
        .finally(() => this.knex.destroy())
    }

    async write(data) {
        
            await this.knex(this.table).insert(data)
            .then((result) => console.log('Escrito correctamente', result))
            .catch( error => console.log(error))
            
        
    }

    async getAll() {
        await this.knex.from(this.table).select('*')
            .then((result) => console.log('leido'))
            .catch( error => console.log(error))
    }

    /* async getById(id) {
        await this.knex.from(this.table).select


        try {
            const contenido = await this.getAll()
            const register = contenido.filter((p) => p.id === id )
            if (register.length === 0) {
                return 'Registro no encontrado'
            }
            return register[0]
            
        } catch (error) {
            console.log(error);
        }
    }

    async add(data) {
        try {
            const content = await this.getAll()
            content.push(data)
            await this.write(JSON.stringify(content))
            return 'Registro agregado correctamente'
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id, newData) {
        try {
            const content = await this.getAll()
            const index = content.findIndex( register => register.id === id);
            if (index === -1) {
                return 'Registro no encontrado'
            }
            const timestamp = content[index].timestamp
            const registry = {...newData, id, timestamp}
            content.splice(index, 1, registry)
            await this.write(JSON.stringify(content))
            return 'Registro actualizado correctamente'
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const content = await this.getAll()
            const index = content.findIndex( register => register.id === id);
            content.splice(index, 1)
            await this.write(JSON.stringify(content))
            return 'Registro eliminado correctamente'
            
        } catch (error) {
            console.log(error);
        }
    } */
    
}


export default Container;