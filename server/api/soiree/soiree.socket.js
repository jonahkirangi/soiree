/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Soiree = require('./soiree.model');

exports.register = function(socket) {
  Soiree.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Soiree.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  Soiree.populate(doc, {path:'created_by', select: 'name'}, function(err, soiree) {
    socket.emit('soiree:save', soiree);
  });
}

function onRemove(socket, doc, cb) {
  socket.emit('soiree:remove', doc);
}
