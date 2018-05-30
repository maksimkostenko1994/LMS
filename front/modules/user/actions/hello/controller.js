angular.module('app').controller('HomeController', ['$scope', function ($scope) {
  $scope.user = JSON.parse(localStorage.getItem('user'))
}]);