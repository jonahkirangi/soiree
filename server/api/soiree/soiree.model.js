'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SoireeSchema = new Schema({
  title: String,
  description: String,
  date: String,
  start_time: String,
  location: String,
  attending: [],
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

SoireeSchema.statics = {
  loadRecent: function(cb) {
    this.find({})
      .populate({path:'created_by', select: 'name'})
      .sort('-date')
      .limit(20)
      .exec(cb);
  }
};

module.exports = mongoose.model('Soiree', SoireeSchema);
