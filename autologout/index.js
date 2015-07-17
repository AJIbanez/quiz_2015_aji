var tiempoMaximo = 2 * 60 * 1000; // Tiempo máximo inactivo 2 minutos

module.exports = function() {

  return function(req, res, next) {
    //recuperamos hora actual y la última guardada en la sesión
    var ahora = new Date().getTime();
    var lastReqTime = req.session.reqTime || ahora;

    //si hay usuario registrado y se supera el tiempo máximo cerramos sesión
    if (req.session.user && ((ahora - lastReqTime) > tiempoMaximo)) {
      delete req.session.user;
      req.session.errors = [{"message": 'Se ha cerrado la sesión por inactividad'}];
    }

    req.session.reqTime = ahora;
    next();
  };
};
