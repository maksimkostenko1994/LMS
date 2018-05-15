angular.module('app').controller('MarkController', ['$scope', '$http','GroupService', function ($scope, $http, GroupService) {
  let id = GroupService.getGroupId();
  $http.get('http://192.168.0.93:8080/informatics/students/group/mark/id/' + id).then(function (res) {
    return $scope.marks = res.data;
  })
}])