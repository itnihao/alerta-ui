'use strict';


var alertaApp = angular.module('alertaApp', [
  'config',
  'ngRoute',
  'ngSanitize',
  'alertaFilters',
  'alertaServices',
  'alertaDirectives',
  'alertaControllers',
  'googleOauth'
])

alertaApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/alerts', {
      templateUrl: 'static/partials/alert-list.html',
      controller: 'AlertListController',
      reloadOnSearch: false
    })
    .when('/alert/:id', {
      templateUrl: 'static/partials/alert-details.html',
      controller: 'AlertDetailController'
    })
    .when('/top10', {
      templateUrl: 'static/partials/alert-top10.html',
      controller: 'AlertTop10Controller',
      reloadOnSearch: false
    })
    .when('/watch', {
      templateUrl: 'static/partials/alert-watch.html',
      controller: 'AlertWatchController'
    })
    .when('/users', {
      templateUrl: 'static/partials/users.html',
      controller: 'UserController'
    })
    .when('/keys', {
      templateUrl: 'static/partials/keys.html',
      controller: 'ApiKeyController'
    })
    .when('/profile', {
      templateUrl: 'static/partials/profile.html',
      controller: 'ProfileController'
    })
    .when('/about', {
      templateUrl: 'static/partials/about.html',
      controller: 'AboutController'
    })
    .when('/login', {
      templateUrl: 'static/partials/login.html',
      controller: 'LoginController'
    })
    .when('/logout', {
      templateUrl: 'static/partials/logout.html',
      controller: 'LogoutController'
    })
    .otherwise({
      redirectTo: '/alerts'
    });
  }]);

alertaApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $location) {
        return {
            'response': function (response) {
                //Will only be called for HTTP up to 300
                return response;
            },
            'responseError': function (rejection) {
                if(rejection.status === 401) {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        };
    });
}]);

alertaApp.config(['config', 'TokenProvider',
  function(config, TokenProvider) {
    TokenProvider.extendConfig({
      clientId: config.client_id,
      redirectUri: config.redirect_url,
      scopes: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"]
    });
  }]);
