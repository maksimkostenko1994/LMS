angular.module('app').controller('CourseController', ['$scope', '$http', '$window', 'GroupService',
  function ($scope, $http, $window, GroupService) {

    let user = JSON.parse(localStorage.getItem('user'))

    $http.get(`http://192.168.43.16:8080/informatics/courses/teacher/${user.id}`).then(function (res) {
      return $scope.courses = res.data
    })
    
    
    $scope.sentId = function ({id, name}) {
      GroupService.setDId({id, name});
      $http.get(`http://192.168.43.16:8080/informatics/courses/steps/${id}`);
      $window.location.href = '#!/user/courses/steps'
    }

    $scope.propertyName = 'id'
    $scope.reverse = true

    $scope.sortBy = function (propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false
      $scope.propertyName = propertyName
    }

  }
])