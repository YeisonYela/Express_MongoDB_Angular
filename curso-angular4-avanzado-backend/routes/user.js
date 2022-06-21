//Rutas
"use strict"

let express = require("express");
let UserContoller = require("../controllers/user");

let api = express.Router();
let md_auth = require("../middlewares/authenticated");

let multipart = require('connect-multiparty');
let md_upload = multipart({ uploadDir: './uploads/users' });

api.get("/pruebas-del-controlador", md_auth.ensureAuth, UserContoller.pruebas);
api.post("/register", UserContoller.saveUser);
api.post("/login", UserContoller.login);
api.put("/update-user/:id", md_auth.ensureAuth, UserContoller.updateUser);
api.post("/upload-image-user/:id", [md_auth.ensureAuth, md_upload], UserContoller.uploadImage);
api.get('/get-image-file/:imageFile', UserContoller.getImageFile);
api.get('/empleados', UserContoller.getEmpleados);

module.exports = api;
