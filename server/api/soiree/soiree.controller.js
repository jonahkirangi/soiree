'use strict';

var _ = require('lodash');
var Soiree = require('./soiree.model');

// Get list of soirees
exports.index = function(req, res) {
  Soiree.find(function (err, soirees) {
    if(err) { return handleError(res, err); }
    return res.json(200, soirees);
  });
};

// Get a single soiree
exports.show = function(req, res) {
  Soiree.findById(req.params.id, function (err, soiree) {
    if(err) { return handleError(res, err); }
    if(!soiree) { return res.send(404); }
    return res.json(soiree);
  });
};

// Creates a new soiree in the DB.
exports.create = function(req, res) {
  Soiree.create(req.body, function(err, soiree) {
    if(err) { return handleError(res, err); }
    return res.json(201, soiree);
  });
};

// Updates an existing soiree in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Soiree.findById(req.params.id, function (err, soiree) {
    if (err) { return handleError(res, err); }
    if(!soiree) { return res.send(404); }
    var updated = _.merge(soiree, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, soiree);
    });
  });
};

// Deletes a soiree from the DB.
exports.destroy = function(req, res) {
  Soiree.findById(req.params.id, function (err, soiree) {
    if(err) { return handleError(res, err); }
    if(!soiree) { return res.send(404); }
    soiree.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}