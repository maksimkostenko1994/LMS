angular.module('app').controller('StepsController', ['$scope', '$http', '$window', 'GroupService',
  function ($scope, $http, $window) {

    let id = JSON.parse(localStorage.getItem('id_course'))
    $http.get(`http://192.168.0.93:8080/informatics/courses/steps/${id}`).then(function (res) {
      console.log('Steps ' + res.data)
      return $scope.steps = res.data
    })
  }
])