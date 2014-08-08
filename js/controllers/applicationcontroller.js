/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function(){

var app = angular.module('movies_app');

var ApplicationController = function ($scope, USER_ROLES, AuthService,AUTH_EVENTS,Session,MediumService
                            , MovieService, GenreService) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;
  $scope.error = '';
  $scope.loggedIn = false;
  $scope.btnLogInOut = 'Sign in';
  $scope.detailsID = '0';
  $scope.mediums;  // contains the selected options from checkboxes
  $scope.mediumfilter;
  $scope.genrefilter;

  $scope.filterOptions = {
        filterText: '',
  };
  
    // after login successfully handle event
  $scope.$on(AUTH_EVENTS.loginSuccess, function(){
//      console.log('applicationController.loginSuccess*****');
      $scope.loggedIn = true;
      $scope.btnLogInOut = 'Sign out';
  });
  $scope.$on(AUTH_EVENTS.logoutSuccess, function() {
//      console.log('applicationController.logoutSuccess*****');
      Session.destroy();
      $scope.btnLogInOut = 'Sign in';
      $scope.loggedIn = false;
  });
  
}   

app.controller('ApplicationController',ApplicationController);

}());
