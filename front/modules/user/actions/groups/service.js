angular.module('app').service('GroupService', [function () {

  function setDId(id) {
    return localStorage.setItem('d_id', id);
  }

  function getDId () {
    return JSON.parse(localStorage.getItem('d_id'))
  }

  function setGroupId(id) {
    return localStorage.setItem('group_id', id);
  }

  function getGroupId () {
    return JSON.parse(localStorage.getItem('group_id'))
  }

  return {
    setDId: setDId,
    getDId: getDId,
    setGroupId: setGroupId,
    getGroupId: getGroupId
  }
}])