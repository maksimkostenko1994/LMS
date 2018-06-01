angular.module('app').controller('AddController', ['$scope', '$http', function ($scope, $http) {
  $scope.items = {firstName: '', lastName: '', email: '', role: ''}
  $http.get('http://192.168.0.93:8080/informatics/roles').then(function (response) {
    return $scope.roles = response.data
  })
  $http.get('http://192.168.0.93:8080/informatics/users').then(function (response) {
    return $scope.users = response.data
  })
  $scope.addUser = function () {
    $http.post('http://192.168.0.93:8080/informatics/createUser', $scope.items).then(function (res) {
      console.log(res)
    })
  }
  $scope.getUser = function (id) {
    return $scope.editUser = id
  }

  $scope.updateUser = function (id) {
    console.log(id)
    $http.post('http://192.168.0.93:8080/informatics/user/id', id).then(function (res) {
      console.log('Updated user ' + JSON.stringify(res.data))
      return $scope.update = res.data
    })
  }

  $scope.setUpdateUser = function () {
    console.log($scope.update)
    $http.post('http://192.168.0.93:8080/informatics/updateUser?admin', $scope.update)
  }

  $scope.propertyName = 'id'
  $scope.reverse = true

  $scope.sortBy = function (propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false
    $scope.propertyName = propertyName
  }

  $scope.remove = function (id) {
    $http.post('http://192.168.0.93:8080/informatics/deleteUser', id).then(function (res) {
      console.log(res)
    })
  }
}])