"use strict";

let mongoose = require("mongoose");
let app = require("./app");
let port = process.env.PORT || 3789;

mongoose.connect("mongodb://localhost:27017/lambor", (err, res) => {
  if (err) {
    throw err;
  } else {
    console.log(
      "La coneccion a la base de datos lambor se a realizado correctamente"
    );

    app.listen(port, () => {
      console.log(
        "El servidor local con Node y Express esta corriendo corectamente..."
      );
    });
  }
});
