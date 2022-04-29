import { Server } from "socket.io";
import { createServer } from "http";
import {engine} from 'express-handlebars';
import express from 'express'
import {fileURLToPath} from 'url';
import path from 'path';
import router from './routes/index.js'
import { products } from "./controllers/products.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let messages = [];

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');
  socket.emit('messages', messages);
  
  socket.on('new-message', function(data) {
      messages.push(data);
      io.sockets.emit('messages', messages);
  });

  socket.on('new-product', function(data) {
    products.push(data);
    io.sockets.emit('products', products);
});
});

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './06_Websockets/views');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/productos', router)

app.get('/', (req, res) => {
    res.send(`<h2><a href='./productos'>Ver y editar productos</a></h2>`)
})

const PORT = process.env.PORT || 8080

const server = httpServer.listen( PORT, () => {
    console.log(`Servidor http con websockets escuchando en el puerto ${server.address().port}`);
})

server.on('error', error => console.log(`Error en el servidor ${error}`))
