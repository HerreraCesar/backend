import { errors } from './controllers/errors.js';
import express from "express";
import router from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', router)
app.use('*', errors)


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(
    `Servidor http con websockets escuchando en el puerto ${
      server.address().port
    }`
  );
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));
