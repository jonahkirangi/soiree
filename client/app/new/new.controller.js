'use strict';

angular.module('soireeApp')
  .controller('NewCtrl', function ($scope, $location, $http) {
    $scope.title = '';
    $scope.location = '';
    $scope.description = '';
    $scope.date = '';

    // Use our REST API to post a new soiree
    $scope.addSoiree = function() {
      $http.post('/api/soirees', {
        title: $scope.title,
        location: $scope.location,
        description: $scope.description,
        date: $scope.date,
      });

      $scope.title = '';
      $scope.location = '';
      $scope.description = '';
      $scope.date = '';

      $location.path('/');
    };
  });
