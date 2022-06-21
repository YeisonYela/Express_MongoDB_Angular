//Rutas
"use strict"

let express = require("express");
let CarroContoller = require("../controllers/carro");

let api = express.Router();
let md_auth = require("../middlewares/authenticated");
let md_admin = require("../middlewares/is_administrador");

let multipart = require('connect-multiparty');
let md_upload = multipart({ uploadDir: './uploads/carros' });

api.get("/pruebas-carros", md_auth.ensureAuth, CarroContoller.pruebas);
api.post("/carro", [md_auth.ensureAuth, md_admin.isAdministrador], CarroContoller.saveEmpleado);
api.get("/carros", CarroContoller.getCarros);
api.get("/carro/:id", CarroContoller.getCarro);
api.put("/carro/:id", [md_auth.ensureAuth, md_admin.isAdministrador], CarroContoller.updateCarro);
api.post("/upload-image-carro/:id", [md_auth.ensureAuth, md_admin.isAdministrador, md_upload], CarroContoller.uploadImage);
api.get('/get-image-carro/:imageFile', CarroContoller.getImageFile);
api.delete("/carro/:id", [md_auth.ensureAuth, md_admin.isAdministrador], CarroContoller.deleteCarro); 

module.exports = api;
