'use strict';

angular.module('soireeApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

    // Grab the initial set of available soirees
    $http.get('/api/soirees').success(function(soirees) {
      $scope.soirees = soirees;

      // Update array with any new or deleted items pushed from the socket
      socket.syncUpdates('soiree', $scope.soirees, function(event, soiree, soirees) {
        // This callback is fired after the soirees array is updated by the socket listeners

        // sort the array every time its modified
        soirees.sort(function(a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a>b ? -1 : a<b ? 1 : 0;
        });
      });
    });

    // Clean up listeners when the controller is destroyed
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('soiree');
    });

    // Use out REST API to delete existing soirees
    $scope.deleteSoiree = function(id) {
      $http.delete('/api/soirees/' + id);
    };
  });
