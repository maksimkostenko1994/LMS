angular.module('app').controller('StepsController', ['$scope', '$http','$filter', '$window', 'GroupService',
  function ($scope, $http,$filter, $window) {
    let id_course = JSON.parse(localStorage.getItem('id_course'))
    $scope.newStep = {title: '', type: '', week: parseInt(''), duration: '', course: id_course}

    $http.get(`http://192.168.0.93:8080/informatics/courses/steps/${id_course}`).then(function (res) {
      return $scope.steps = res.data
    })

    $scope.weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15]

    $scope.setStep = function () {
      $http.post('http://192.168.0.93:8080/informatics/courses/steps/createStep', $scope.newStep)
    }

    $scope.updateStep = function (id) {
      $http.post('http://192.168.0.93:8080/informatics/courses/steps/id', id).then(function (res) {
        return $scope.update = {
          title: res.data.title,
          type: res.data.type,
          week: JSON.stringify(res.data.week),
          duration: new Date($filter('date')(res.data.duration, 'yyyy-MM-dd')),
          course: id_course
        }
      })
    }

    $scope.setUpdateStep = function() {

      $http.post('http://192.168.0.93:8080/informatics/courses/updateStep', $scope.update);
    }

    $scope.propertyName = 'id'
    $scope.reverse = true

    $scope.sortBy = function (propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false
      $scope.propertyName = propertyName
    }
  }
])