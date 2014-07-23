(function(){

var app = angular.module('movies_app');

var LoginController = function ($scope, $rootScope, AUTH_EVENTS, AuthService,MediumService){
    $scope.login = function(credentials){
        AuthService.login(credentials).then(function () { // success
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.$broadcast(AUTH_EVENTS.loginSuccess);
        }, function () { // failure
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    }
    $scope.logout = function(){
//        console.log('&&&&&&&&&&& Signed out &&&&&');
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }

    $scope.credentials = {
        username: '',
        password: ''
  };
    //console.log('end LoginController');

}
app.controller('LoginController',LoginController);


}());
