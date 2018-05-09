angular.module('app').controller('UserController', ['$scope', '$http',
  function ($scope, $http) {
    $scope.name = ''
    $http.get('http://192.168.0.93:8080/informatics/user')
      .then(function (response) {
        $scope.users = response.data
      })
  }
])