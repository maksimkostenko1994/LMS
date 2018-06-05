angular.module('app').service('GroupService', [function () {

  function setDId({id, name}) {
    return localStorage.setItem('d_id', JSON.stringify({id: id,name: name}));
  }

  function getDId () {
    return JSON.parse(localStorage.getItem('d_id'))
  }

  function setGroupId({id, name}) {
    return localStorage.setItem('group_id', JSON.stringify({id: id,name: name}));
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