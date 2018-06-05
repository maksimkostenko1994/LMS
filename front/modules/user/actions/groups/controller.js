angular.module('app').controller('GroupController', ['$scope', '$http','$window','GroupService',
  function ($scope, $http,$window, GroupService) {
  $scope.id = GroupService.getDId();
  $http.get('http://192.168.43.16:8080/informatics/group/id/' + $scope.id.id).then(function (res) {
    return $scope.groups = res.data;
  })

  $scope.getMarks = function ({id, name}) {
    GroupService.setGroupId({id,name});
    $window.location.href = '#!/user/groups/marks/' + id
  }

    $scope.propertyName = 'id'
    $scope.reverse = true

    $scope.sortBy = function (propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false
      $scope.propertyName = propertyName
    }
}])