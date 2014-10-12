(function(){

    var app = angular.module('movies_app');

    var LoginController = function ($scope, $rootScope, AUTH_EVENTS, AuthService){
        $scope.login = function(credentials){
            AuthService.login(credentials).then(function () { // success
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $scope.$broadcast(AUTH_EVENTS.loginSuccess);
            }, function () { // failure
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };

        $scope.logout = function(){
            AuthService.logout().then(function() {
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                $scope.credentials = {
                    username: '',
                    password: ''
              };
            }, function() {});
        };
    }
    app.controller('LoginController',LoginController);
}());