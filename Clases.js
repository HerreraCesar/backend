class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName () {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota (nombre) {
        this.mascotas.push(nombre)
    }

    countMascotas () {
        return this.mascotas.length
    }

    addBook (nombre, autor) {
        this.libros.push (
            {
                nombre: nombre,
                autor: autor
            }
        )
    }
    
    getBookNames () {
        return this.libros.map ( libro => libro.nombre)
    }

    
}

const usuario = new Usuario ('César','Herrera', [{"nombre": "Diario de Ana Frank", "autor": "Ana Frank"}], ['Perro','Hamster'])

console.log(usuario.getFullName());
console.log(usuario.countMascotas());
console.log(usuario.getBookNames());
usuario.addBook('El señor de las moscas', 'William Golding')
console.log(usuario.getBookNames());
usuario.addMascota('Gato');
console.log(usuario.countMascotas());