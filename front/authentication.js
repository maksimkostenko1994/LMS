import store from 'store'

angular.module('app.authentication', []).factory('authenticationInterceptor', [
  function () {
    return {
      // for more read about angular http interceptors
      request: function (config) {
        // https://www.npmjs.com/package/store
        // use it to get token from localStorage

        let token = store.get('token');
        config.headers.Authorization = 'Bearer ' + token;
        return config;
      }
    };
  }
])