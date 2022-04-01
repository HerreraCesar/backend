import bodyParser from 'body-parser'
import express from 'express'
import router from './routes/index.js'

const app = express()

app.use(express.static('views'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/productos', router)

const PORT = 8080

const server = app.listen( PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on('error', error => console.log(`Error en el servidor ${error}`))