angular.module('app').controller('DisciplineController', ['$scope', '$http', '$window', 'GroupService',
  function ($scope, $http, $window, GroupService) {

    let user = JSON.parse(localStorage.getItem('user'))

    $http.get(`http://192.168.43.16:8080/informatics/courses/teacher/${user.id}`).then(function (res) {
      return $scope.teacher = res.data
    })

    $http.get('http://192.168.43.16:8080/informatics/courses?active').then(function (res) {
      return $scope.courses = res.data
    })

    $scope.getGroups = function ({id, name}) {
      GroupService.setDId({id, name})
      $window.location.href = '#!/user/groups/' + id
    }

    $scope.propertyName = 'id'
    $scope.reverse = true

    $scope.sortBy = function (propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false
      $scope.propertyName = propertyName
    }
  }])