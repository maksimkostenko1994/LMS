angular.module('app').controller('MarkController', ['$scope', '$http','$window', 'GroupService', function ($scope, $http,$window, GroupService) {
  let id = GroupService.getGroupId()
  $http.get('http://192.168.0.93:8080/informatics/group/mark/id/' + id).then(function (res) {
    return $scope.marks = res.data
  })

  $scope.groupId = localStorage.getItem('group_id');
  console.log($scope.groupId);

  $scope.getExcel = function (id) {
    console.log("This id "+id)
    $http.post(`http://192.168.0.93:8080/informatics/group/mark/id/${id}/exportExcel`, id)
    $window.location.href = `http://192.168.0.93:8080/informatics/group/mark/id/${id}/exportExcel`;
  }
}])