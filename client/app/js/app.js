angular.module('fingertips', [
  'ngRoute',
  'ipCookie',
  'ngMessages'
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider
    .when('/', {
      controller: 'MainCtrl',
      controllerAs: 'main',
      templateUrl: '/app/view/main.html'
    })
    .when('/about', {
      controller: 'MainCtrl',
      controllerAs: 'about',
      templateUrl: '/app/view/about.html'
    })
    .when('/contact', {
      controller: 'MainCtrl',
      controllerAs: 'contact',
      templateUrl: '/app/view/contact.html'
    });
}]);