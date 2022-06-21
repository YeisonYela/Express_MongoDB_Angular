"use strict";

let jwt = require("jwt-simple");
let moment = require("moment");
let secret = "clave_secreta_del_curso_de_angular4avanzado";

exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "La peticion no tiene la cabecera de autenticación" });
  }
  let token = req.headers.authorization.replace(/['"]+/g, "");
  try {
    let payload = jwt.decode(token, secret);
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: "Token ha expirado" });
    }
    req.user = payload;
  } catch (error) {
    console.log(error);
    return res.status(404).send({ message: "Token no válido" });
  }
  next();
};
