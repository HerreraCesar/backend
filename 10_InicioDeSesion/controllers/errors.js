export const errors = (req, res, next) => {
  res.send({
    error: -2,
    description: `ruta ${req.baseUrl} metodo ${req.method} no autorizada`,
  });
};
