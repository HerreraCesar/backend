export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log(`ruta ${req.baseUrl} metodo ${req.method} no autorizada`);
    res.redirect("/login");
  }
};
