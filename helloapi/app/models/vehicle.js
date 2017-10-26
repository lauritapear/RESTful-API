var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehicleSchema =new Schema({
  make: String,
  model: String,
  color: String
});

module.exports = mongoose.model('vehivle', vehicleSchema);
