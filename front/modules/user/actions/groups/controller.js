angular.module('app').controller('GroupController', ['$scope', '$http','$window','GroupService',
  function ($scope, $http,$window, GroupService) {
  let id = GroupService.getDId();
  $http.get('http://192.168.0.93:8080/informatics/group/id/' + id).then(function (res) {
    console.log(res.data)
    return $scope.groups = res.data;
  })

  $scope.getMarks = function (id) {
    GroupService.setGroupId(id);
    $window.location.href = '#!/user/groups/marks/' + id
  }
}])