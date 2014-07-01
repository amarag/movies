/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function(){

var app = angular.module('movies_app');

var LoginController = function ($scope, $rootScope, AUTH_EVENTS, AuthService,MediumService){
    //console.log('Start LoginController');
    $scope.login = function(credentials){
        //console.log('In login Controller ' + credentials.username + ' || ' + credentials.password);
        AuthService.login(credentials).then(function () {
              MediumService.getMediums().then(onMediumsListComplete,onerror);
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          });
          
    var onMediumsListComplete = function(response){
        console.log('In LoginControlleronMediumsListComplete' + response + ' || '+AuthService.isAuthenticated());
        $scope.mediums = response.data;
        //console.log($scope.mediums);
    }
    var onError = function(reason){
        console.log('In onError' + reason);
        $scope.error = 'Could not load list!';
    }
          

          
    }

    $scope.credentials = {
        username: '',
        password: ''
  };
    //console.log('end LoginController');

}
app.controller('LoginController',LoginController);


}());
