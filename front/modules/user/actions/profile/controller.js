angular.module('app').controller('ProfileController', ['$scope', '$http', function ($scope, $http) {
  $scope.items = {id: $scope.user.id, email: $scope.user.email, password: ''}

  $scope.user = JSON.parse(localStorage.getItem('user'))

  $scope.update = function () {
    $scope.user.email = $scope.items.email;
    $scope.user.password = $scope.items.password;
    localStorage.setItem('user', JSON.stringify($scope.user))
  }

  // $scope.update = function () {
  //   if ($scope.items.email !== null && $scope.items.password !== null &&
  //     $scope.items.email !== $scope.user.email && $scope.items.password !==$scope.user.password) {
  //     $http.post('http://192.168.0.93:8080/informatics/updateUser', $scope.items).then(function (res) {
  //       console.log(res)
  //     })
  //   }
  // }
}])