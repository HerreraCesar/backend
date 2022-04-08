import {engine} from 'express-handlebars';
import express from 'express'
import router from './routes/index.js'

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './05_MotoresDePlantillas/handlebars/views');

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/productos', router)

app.get('/', (req, res) => {
    res.send(`<h2><a href='./productos'>Ver y editar productos</a></h2>`)
})

const PORT = 3000

const server = app.listen( PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on('error', error => console.log(`Error en el servidor ${error}`))