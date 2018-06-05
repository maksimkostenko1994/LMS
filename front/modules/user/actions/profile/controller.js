angular.module('app').controller('ProfileController', ['$scope', '$http', function ($scope, $http) {
  $scope.items = {id: $scope.user.id, email: $scope.user.email, password: ''}
  $scope.user = JSON.parse(localStorage.getItem('user'))

  $scope.update = function () {
    if ($scope.items.email !== null && $scope.items.password !== null && $scope.items.password !== $scope.user.password) {
      $http.post('http://192.168.43.16:8080/informatics/updateUser', $scope.items);
    }
  }
}])