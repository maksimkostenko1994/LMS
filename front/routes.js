angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/user/addition', {templateUrl: './modules/user/actions/addition/template.html', controller: 'AddController'})
      .when('/user/hello', {templateUrl: './modules/user/actions/hello/template.html'});
  $locationProvider.html5Mode({enable: true, requireBase: false}).hashPrefix('!');
  // window.location = '#!/main';
}])