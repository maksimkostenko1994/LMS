angular.module('app').controller('CourseController', ['$scope', '$http', '$window',
  function ($scope, $http, $window) {

    let user = JSON.parse(localStorage.getItem('user'))

    $http.get(`http://192.168.0.93:8080/informatics/courses/teacher/${user.id}`).then(function (res) {
      console.log(res.data[0].course.semester)
      console.log(typeof res.data[0].course.semester)
      return $scope.courses = res.data
    })
    
    
    $scope.sentId = function (id) {
      console.log('Course id '+ id);
      localStorage.setItem('id_course', id);
      $http.get(`http://192.168.0.93:8080/informatics/courses/steps/${id}`);
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