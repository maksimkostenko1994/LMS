angular.module('app').controller('DisciplineController', ['$scope', '$http', '$window', 'GroupService',
  function ($scope, $http, $window, GroupService) {

    let user = JSON.parse(localStorage.getItem('user'))

    $http.get(`http://192.168.0.93:8080/informatics/courses/teacher/${user.id}`).then(function (res) {
      return $scope.courses = res.data
    })

    $http.get('http://192.168.0.93:8080/informatics/courses?active').then(function (res) {
      console.log(res.data)
      return $scope.teacher = res.data
    })

    $scope.getGroups = function (id) {
      GroupService.setDId(id)
      $window.location.href = '#!/user/groups/' + id
    }

    $scope.propertyName = 'id'
    $scope.reverse = true

    $scope.sortBy = function (propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false
      $scope.propertyName = propertyName
    }
  }])