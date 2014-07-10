(function(){

    var app = angular.module('movies_app', ['ngRoute','ui.bootstrap']);
    
    app.config(function ($routeProvider){
        $routeProvider
                .when('/',{
                    templateUrl: 'movies.html',
                    controller: 'HomeController'
                })
                .when('/about',{
                    templateUrl: 'global/about.html',
                    controller: 'AboutController'
                })
                .when('/add',{
                    templateUrl: 'movies/add.html',
                    controller: 'AddController'
                })
/*                .when('/user/:username', {
                    templateUrl: 'user.html',
                    controller: 'UserController'
                })
                .when('/repo/:username/:reponame',{
                    templateUrl: 'repo.html',
                    controller: 'RepoController'
                })
*/                
                .otherwise({redirectTo: '/'})
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
      
      app.service('Session', function () {
        this.create = function (sessionId, userName,password, userEmail, userRole, userLastlogin, userActive, userAttempts,userHashKey) {
          this.id = sessionId;
          this.userName = userName;
          this.password = password;
          this.email = userEmail;
          this.userRole = userRole;
          this.lastLogin = userLastlogin;
          this.active = userActive;
          this.attempts = userAttempts;
          this.hashkey = userHashKey;
        };
        this.destroy = function () {
          this.id = null;
          this.userName = null;
          this.password = null;
          this.userRole = null;
          this.email = null;
          this.lastLogin = null;
          this.active = null;
          this.attempts = null;
          this.hashkey = null;
        };
        return this;
      })
}());