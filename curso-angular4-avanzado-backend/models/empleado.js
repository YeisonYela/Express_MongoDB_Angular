"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let EmpleadoSchema = new mongoose.Schema({
  name: String,
  description: String,
  year: Number,
  image: String,
  user: { type: Schema.ObjectId, ref: "Empleado" },
});

module.exports = mongoose.model("Empleado", EmpleadoSchema);
