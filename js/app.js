(function(){

    var app = angular.module('movies_app', ['ngRoute','ui.bootstrap']);
    
    app.config(function ($routeProvider,$locationProvider){
        $routeProvider
                .when('/',{
                    templateUrl: 'js/partials/movies.html',
                    controller: 'MainpageController'
                })
                .when('/about',{
                    templateUrl: 'js/partials/about.html',
                    controller: 'AboutController'
                })
                .when('/add',{
                    templateUrl: 'js/partials/add.html',
                    controller: 'AddController'
                })
                .when('/view',{
                    templateUrl: 'js/partials/view.html',
                    controller: 'ViewController'
                })
                .otherwise({redirectTo: '/'})
        //$locationProvider.html5Mode(true);
    });
    
    app.constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized',
      });
      
      app.constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'editor',
        reader: 'reader',
        guest: 'guest'
      });
      
      app.filter('true_false', function() {
          return function(text){
              if (text == 1) {
                  return 'Yes';
              } else if (text == 0){
                return 'No';
            } else {
                return '';
            }
          }
      });
}());