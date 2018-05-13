angular.module('app').controller('AddController', ['$scope', '$http', function ($scope, $http) {
  $scope.items = {firstName: '', lastName: '', email: '', role: ''};

  $http.get('http://192.168.0.93:8080/informatics/roles').then(function (response) {
    return $scope.roles = response.data;
  });

  $http.get('http://192.168.0.93:8080/informatics/users').then(function (response) {
    return $scope.users = response.data;
  })

  $scope.addUser = function() {
    $http.post('http://192.168.0.93:8080/informatics/createUser', $scope.items).then(function (res) {
        console.log(res);
    });
  }

  $scope.propertyName = 'age';
  $scope.reverse = true;

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };
}])