angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/user/addition', {templateUrl: './modules/user/actions/addition/template.html', controller: 'AddController'})
    .when('/user/hello', {templateUrl: './modules/user/actions/hello/template.html'})
    .when('/user/entrants', {
      templateUrl: './modules/user/actions/entrants/template.html',
      controller: 'EntrantController'
    })
    .when('/user/lecturers', {
      templateUrl: './modules/user/actions/lecturers/template.html',
      controller: 'LecturerController'
    })
    .when('/user/edplanes', {
      templateUrl: './modules/user/actions/edplanes/template.html',
      controller: 'EducationController'
    })
    .when('/user/discipline', {
      templateUrl: './modules/user/actions/discipline/template.html',
      controller: 'DisciplineController'
    })
    .when('/user/search', {templateUrl: './modules/user/actions/search/template.html', controller: 'SearchController'})
    .when('/user/profile', {
      templateUrl: './modules/user/actions/profile/template.html',
      controller: 'ProfileController'
    })
    .when('/user/groups/:id', {
      templateUrl: './modules/user/actions/groups/template.html',
      controller: 'GroupController'
    })
    .when('/user/groups/marks/:id', {
      templateUrl: './modules/user/actions/marks/template.html',
      controller: 'MarkController'
    })
    .when('/user/courses', {
      templateUrl: './modules/user/actions/courses/template.html',
      controller: 'CourseController'
    })
    .when('/user/courses/steps', {
      templateUrl: './modules/user/actions/steps/template.html',
      controller: 'StepsController'
    })
  $locationProvider.html5Mode({enable: true, requireBase: false}).hashPrefix('!')
}])