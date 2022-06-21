"use strict";

//Modulos
let bcrypt = require("bcrypt-nodejs");
let fs = require('fs');
let path = require('path');

//Modelos
let User = require("../models/user");

//Servicio jwt
let jwt = require('../services/jwt');

//Acciones
function pruebas(req, res) {
  res.status(200).send({
      message: "Probando el controlador de usuarios y la accion pruebas",
    user: req.user
  });
}

//Metodos

function saveUser(req, res) {
  //Crear objeto de usuario
  let user = new User();

  //Recoger parametro de peticion
  let params = req.body;

  //Asignar valor al objeto de usuario
  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.role = "ROLE_USER";
  user.image = null;

  if (params.password && params.name && params.surname && params.email) {
    //Asignar valor al objeto de usuario
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = "ROLE_USER";
    user.image = null;

    User.findOne({ email: user.email.toLowerCase() }, (err, issetUser) => {
      if (err) {
        res.status(500).send({ message: "Error al comprobar el usuario" });
      } else {
        if (!issetUser) {
          //Cifrar contraseña
          bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;

            //Guardar usuario en la bd
            user.save((err, userStored) => {
              if (err) {
                res
                  .status(500)
                  .send({ message: "Error al guardar el usuario" });
              } else {
                if (!userStored) {
                  res
                    .status(404)
                    .send({ message: "No se ha registrado el usuario" });
                } else {
                  res.status(200).send({ user: userStored });
                }
              }
            });
          });
        } else {
          res.status(200).send({
            message: "El usuario no puede registrarse",
          });
        }
      }
    });
  } else {
    res.status(200).send({
      message:
        "Introduce los datos correctamente para poder registrar el usuario",
    });
  }
}

function login(req, res) {
  let params = req.body;
  let email = params.email;
  let password = params.password;

  User.findOne({ email: email.toLowerCase()}, (err, user) => {
    if (err) {
      res.status(500).send({ message: "Error al comprobar el usuario" });
    } else {
        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if(check){

                    //Comprobar y generar el token
                    if(params.gettoken){
                        //Devolver el token jwt
                        res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    }else{
                        res.status(200).send({user});
                    } 
                
                }else{
                    res.status(404).send({
                        message: "El usuario no ha podido loguearse contraseña incorrectamente",
                    });
                }
            });            
        } else {
            res.status(404).send({
                message: "El usuario no ha podido loguearse",
              });
      }
    }
  });
}

function updateUser(req, res){
  let userId = req.params.id;
  let update = req.body;
  delete update.password;

  if(userId != req.user.sub){
    return res.status(500).send({message: 'No tienes permiso para actualizar el usuario'});
  }

  User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => {
    if(err){
      res.status(500).send({
        message: "Error al actualizar el usuario"
      });
    }else{
      if(!userUpdated){
        res.status(404).send({message: 'No se ha podido actualizar el usuario'});
      }else{
        res.status(200).send({user: userUpdated});
      }
    }
  });
}

function uploadImage(req, res){
    let userId = req.params.id;
    let file_name = 'No subido...';

    if(req.files){
      let file_path = req.files.image.path;
      let file_split = file_path.split('\\');
      let file_name = file_split[2];

      let ext_split = file_name.split('\.');
      let file_ext = ext_split[1];

      if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){

        if(userId != req.user.sub){
            return res.status(500).send({message: 'No tienes permiso para actualizar el usuario'});
          }
          
          User.findByIdAndUpdate(userId, {image: file_name}, {new:true}, (err, userUpdated) => {
            if(err){
              res.status(500).send({
                message: "Error al actualizar el usuario"
                });
            }else{
                if(!userUpdated){
                    res.status(404).send({message: 'No se ha podido actualizar el usuario'});
            }else{
                 res.status(200).send({user: userUpdated, image: file_name});
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

function getImageFile(req, res){
  let imageFile = req.params.imageFile;
  let path_file = './uploads/users/'+imageFile;

  fs.exists(path_file, function(exists){
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(404).send({message: 'La imagen no existe'}); 
    }
  });
}

function getEmpleados(req, res){
  User.find({role: 'ROLE_ADMIN'}).exec((err, users) => {
      if(err){
        res.status(500).send({message: 'Error en la peticion'}); 
      }else{
        if(!users){
          res.status(404).send({message: 'No hay cuidadores'}); 
        }else{
          res.status(200).send({users});
        }
      }
  });
}

module.exports = {
  pruebas,
  saveUser,
  login,
  updateUser,
  uploadImage,
  getImageFile,
  getEmpleados
};
