const fs = require('fs');

class Container {
    
    constructor(filename) {
        this.filename = filename;
    }

    async write(data) {
        try {
            await fs.promises.writeFile(this.filename, data);
            console.log('Escrito correctamente');
        } catch (error) {
            console.log(error);
        }
    }

    async save(data) {
        try {
            const content = await this.getAll()
            let id = 1;
            if (content.length > 0) {
                id = content[content.length-1].id + 1;
            }
            const product = {...data, id: id}
            content.push(product)
            await this.write(JSON.stringify(content))
            return product.id
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            return JSON.parse(await fs.promises.readFile(this.filename, 'utf-8'))
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const contenido = await this.getAll()  
            const product = contenido.filter( (p) => p.id === id )
            if (product.length === 0) {
                return null
            }
            return product
            
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            await this.write('[]')
            console.log('Contenido borrado');
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const contenido = await this.getAll()
            const product = contenido.filter((p) => p.id !== id)
            return await this.write(JSON.stringify(product))
            
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Container;
