angular.module('app').controller('RateController', ['$scope', '$http', '$window',
  function ($scope, $http, $window) {

    $scope.get_rate = {speciality: '', level: '', year: '', semester: ''}

    $scope.getRate = function () {
      if ($scope.get_rate.speciality !== '' || $scope.get_rate.level !== '' || $scope.get_rate.year !== '' || $scope.get_rate.semester !== '') {
        $http.post('http://192.168.43.16:8080/informatics/speciality/rating', $scope.get_rate).then(function (res) {
          return $scope.rates = res.data
        })
      }
    }

    $scope.getRateExcel = function () {
      if ($scope.get_rate.speciality !== '' || $scope.get_rate.level !== '' || $scope.get_rate.year !== '' || $scope.get_rate.semester !== '') {
        $window.location.href = `http://192.168.43.16:8080/informatics/speciality/rating/exportExcel?speciality=${$scope.get_rate.speciality}&level=${$scope.get_rate.level}&year=${$scope.get_rate.year}&semester=${$scope.get_rate.semester}`
      }
    }

    $scope.propertyName = 'id'
    $scope.reverse = true

    $scope.sortBy = function (propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false
      $scope.propertyName = propertyName
    }


    $scope.specializes_m = ['Інженерія програмного забезпечення', 'Прикладна математика', 'Комп\'ютерні науки', 'Системний аналіз']
    $scope.specializes_b = ['Інженерія програмного забезпечення', 'Прикладна математика', 'Комп\'ютерні науки']
    $scope.degree = ['Бакалавр', 'Магістр']
    $scope.year_b = ['1', '2', '3', '4']
    $scope.year_m = ['1', '2']
    $scope.semester_b = ['1', '2', '2д', '3', '4', '4д', '5', '6', '6д', '7', '8', '8д']
    $scope.semester_m = ['1', '2', '2д', '3', '4', '4д']
  }
])