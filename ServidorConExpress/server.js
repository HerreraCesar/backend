const express = require('express')
const random = require('random')
const Container = require('../ManejoDeArchivos/index')

const products = new Container('./productos.txt')

const app = express()

app.get('/', (req, res) => {
    const data = `
        <h1>Bienvenido</h1>
        <br/>
        <a href="./productos">Todos los productos</a>
        <br/>
        <br/>
        <a href="./productoRandom">Producto aleatorio</a>`
    res.send(data)
})

app.get('/productos', async (req, res) => {
    const data = await products.getAll()
    res.send(data)
})

app.get('/productoRandom', async (req, res) => {
    const data = await products.getAll()
    const randomIndex = random.int((min = 0), (max = data.length-1))
    const id = data[randomIndex].id
    const product = await products.getById(id)
    res.send(product)
})

const PORT = 8080

const server = app.listen( PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on('error', error => console.log(`Error en el servidor ${error}`))

