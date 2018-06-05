angular.module('app').controller('MarkController', ['$scope', '$http','$window', 'GroupService', function ($scope, $http,$window, GroupService) {
  $scope.course_name = GroupService.getDId();
  $scope.groupId = GroupService.getGroupId();
  $scope.user = JSON.parse(localStorage.getItem('user'))

  $http.get('http://192.168.43.16:8080/informatics/group/mark/id/' + $scope.groupId.id).then(function (res) {
    return $scope.marks = res.data
  })


  $scope.checkIfEnterKeyWasPressed = function($event, {grade, id, step, student}){
    let keyCode = $event.which || $event.keyCode;
    if (keyCode === 13) {
      $http.post('http://192.168.43.16:8080/informatics/steps/rate/student', {grade, id, step, student});
    }

  };

  $scope.getExcel = function (id) {
    $http.post(`http://192.168.43.16:8080/informatics/group/mark/id/${id}/exportExcel`, id)
    $window.location.href = `http://192.168.43.16:8080/informatics/group/mark/id/${id}/exportExcel`;
  }
}])