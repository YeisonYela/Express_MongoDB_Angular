"use strict";

// modulos
let fs = require("fs"); //libreria para trabajar con sistema de ficheros
let path = require("path");

//modelos
let User = require("../models/user");
let Empleado = require("../models/empleado");

//Servicio jwt
let jwt = require("../services/jwt");
const empleado = require("../models/empleado");
const { findByIdAndDelete, findByIdAndRemove } = require("../models/user");

//acciones
function pruebas(req, res) {
  res.status(200).send({
    message: "Probando el controlador pruebas",
    user: req.user,
  });
}

function saveEmpleado(req, res) {
  let empleado = new Empleado();
  let params = req.body;

  if (params.name) {
    empleado.name = params.name;
    empleado.description = params.description;
    empleado.year = params.year;
    empleado.image = null;
    empleado.user = req.user.sub;

    empleado.save((err, empleadoStored) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        if (!empleadoStored) {
          res.status(404).send({ message: "No se ha guardado el empleado" });
        } else {
          res.status(200).send({ empleadoStored });
        }
      }
    });
  } else {
    res.status(200).send({
      message: "El nombre del empleado es obligatorio",
    });
  }
}

function getCarros(req, res){
  Empleado.find({}).populate({path: 'user'}).exec((err, carros) =>{
    if(err){
      res.status(500).send({
        message: 'Error en la peticion'
      });
    }else{
      if(!carros){
        res.status(404).send({
          message: 'No hay carros'
        });
      }else{
        res.status(200).send({
          message: carros
        });
      }
    }
  });
}

function getCarro(req, res){
  let carroId = req.params.id;

  Empleado.findById(carroId).populate({path: 'user'}).exec((err, carro) =>{
    if(err){
      res.status(500).send({
        message: 'Error en la peticion'
      });
    }else{
      if(!carro){
        res.status(404).send({
          message: 'El carro no existe'
        });
      }else{
        res.status(200).send({
          message: carro
        });
      }
    }
  });
}

function updateCarro(req, res){

  let carroId = req.params.id;
  let update = req.body;

  Empleado.findByIdAndUpdate(carroId, update, {new:true}, (err , carroUpdated) =>{
    if(err){
      res.status(500).send({
        message: 'Error en la peticion'
      });
    }else{
      if(!carroUpdated){
        res.status(4004).send({
          message: 'No se ha actualizado el carro'
        });
      }else{
        res.status(200).send({carro: carroUpdated});
      }
    }
  });
}

function uploadImage(req, res){
  let carroId = req.params.id;
  let file_name = 'No subido...';

  if(req.files){
    let file_path = req.files.image.path;
    let file_split = file_path.split('\\');
    let file_name = file_split[2];

    let ext_split = file_name.split('\.');
    let file_ext = ext_split[1];

    if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
        
        Empleado.findByIdAndUpdate(carroId, {image: file_name}, {new:true}, (err, carroUpdated) => {
          if(err){
            res.status(500).send({
              message: "Error al actualizar el carro"
              });
          }else{
              if(!carroUpdated){
                  res.status(404).send({message: 'No se ha podido actualizar el carro'});
          }else{
               res.status(200).send({carro: carroUpdated, image: file_name});
            }
          }
      });

    }else{
        fs.unlink(file_path, (err) => {
          if(err){
            res.status(200).send({message: 'Extension no valida y fichero no borrado'});
          }else{
            res.status(200).send({message: 'Extension no valida'});
          }
        });          
    }
  }else{
    res.status(200).send({message: 'No se ha subido archivos'});
  }
}

function getImageFile(req, res) {
  let imageFile = req.params.imageFile;
  const pathFile = `./uploads/carros/${imageFile}`;
  fs.exists(pathFile, (exists) => {
      if (exists) {
          res.sendFile(path.resolve(pathFile));
      } else {
          res.status(404).send({message: 'No existe la imagen'});
      }
  })
}

function deleteCarro(req, res){
  let carroId = req.params.id;

  Empleado.findByIdAndRemove(carroId, (err, carroRemove) => {
    if(err){
      res.status(500).send({message: 'Error en la peticion' +err});
    }else{
      if(!carroRemove){
        res.status(404).send({message: 'No se ha eliminado el carro'});
      }else{
        res.status(200).send({carro: carroRemove});
      }
    }
  });
}

module.exports = {
  pruebas,
  saveEmpleado,
  getCarros,
  getCarro,
  updateCarro,
  uploadImage,
  getImageFile,
  deleteCarro,
};
