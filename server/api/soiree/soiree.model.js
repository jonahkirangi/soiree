'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SoireeSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Soiree', SoireeSchema);