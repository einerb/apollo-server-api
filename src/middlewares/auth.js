import jwt from "jsonwebtoken";

import config from "../config/";

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.authenticated = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    // Verificar si hay token
    req.authenticated = false;
    return next();
  }
  let decodedToken;
  try {
    // Decodificar el token recibido
    decodedToken = jwt.verify(token, config.jwt_encryption);
  } catch (err) {
    req.authenticated = false;
    return next();
  }
  if (!decodedToken) {
    req.authenticated = false;
    return next();
  }
  req.authenticated = true;
  req.userId = decodedToken.userId;
  next();
};
