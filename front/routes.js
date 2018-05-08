angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/signin', {templateUrl: './modules/authorization/template.html', controller: 'AuthController'})
      .when('/user', {templateUrl: './modules/user/template.html', controller: 'UserController'});
  $locationProvider.html5Mode({enable: true, requireBase: false}).hashPrefix('!');
  window.location = '#!/signin';
}])