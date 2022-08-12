import { app } from "../server.js";
import cluster from "cluster";
import config from "../config.js";
import { cpus } from "os";
import process from "process";

export const forkServer = () => {
  const server = app.listen(config.arguments.port, () => {
    console.log(
      `Servidor http con websockets escuchando en el puerto ${
        server.address().port
      }`
    );
  });
  server.on("error", (error) => console.log(`Error en el servidor ${error}`));
  console.log(`Worker ${process.pid} started`);
};

export const clusterServer = () => {
  const CPUs = cpus().length;
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < CPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    forkServer();
  }
};
