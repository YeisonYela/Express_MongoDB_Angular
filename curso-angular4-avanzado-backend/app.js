'use strict'

let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');

let app = express();

//Cargar rutas
let user_routes = require('./routes/user');
let carro_routes = require('./routes/carro');

//middlewares de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

//Configurar cabeceras y cors
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
  res.header('Allow','GET, POST,OPTION,PUT,DELETE');
  next();
});

//Rutas base
app.use('/api', user_routes);
app.use('/api', carro_routes);

module.exports = app;
