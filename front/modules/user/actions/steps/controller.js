angular.module('app').controller('StepsController', ['$scope', '$http', '$filter', '$window', 'GroupService',
  function ($scope, $http, $filter, $window, GroupService) {
    $scope.id_course = GroupService.getDId()
    $scope.newStep = {title: '', type: '', week: parseInt(''), duration: '', course: $scope.id_course.id}

    $http.get(`http://192.168.43.16:8080/informatics/courses/steps/${$scope.id_course.id}`).then(function (res) {
      return $scope.steps = res.data
    })

    $scope.weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15]
    $scope.types = ['Тест', 'Лабораторна', 'Практична', 'Семінар', 'Реферат', 'Контрольна', 'Самостійна', 'Усна відповідь', 'Підсумкова']

    $scope.setStep = function () {
      $http.post('http://192.168.43.16:8080/informatics/courses/steps/createStep', $scope.newStep)
    }

    $scope.updateStep = function (id) {
      $http.post('http://192.168.43.16:8080/informatics/courses/steps/id', id).then(function (res) {
        return $scope.update = {
          id: res.data.id,
          title: res.data.title,
          type: res.data.type,
          week: JSON.stringify(res.data.week),
          duration: new Date($filter('date')(res.data.duration, 'yyyy-MM-dd')),
          course: $scope.id_course.id
        }
      })
    }

    $scope.setUpdatedStep = function () {
      $http.post('http://192.168.43.16:8080/informatics/courses/steps/updateStep', $scope.update)
    }

    $scope.propertyName = 'id'
    $scope.reverse = true

    $scope.sortBy = function (propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false
      $scope.propertyName = propertyName
    }
  }
])