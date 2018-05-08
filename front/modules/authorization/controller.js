angular.module('app').controller('AuthController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
  $scope.item = {email: '', password: ''}

  $scope.login = function () {
    $http.post('http://192.168.0.93:8080/informatics/user', $scope.item).then(function (response) {
      if (($scope.item.email === response.data.email) && ($scope.item.password === response.data.password)) {
        $window.location.href = '#!/user'
      }
    })
  }

}])