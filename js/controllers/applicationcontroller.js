/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function(){

var app = angular.module('movies_app');

var ApplicationController = function ($scope, USER_ROLES, AuthService,AUTH_EVENTS,Session,MovieService) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;
  $scope.error = 'Error tekst';
  $scope.loggedIn = false;
  $scope.btnLogInOut = 'Sign in';
  
    // after login successfully handle event
  $scope.$on(AUTH_EVENTS.loginSuccess, function(){
      console.log('applicationController.loginSuccess*****');
      $scope.loggedIn = true;
      $scope.btnLogInOut = 'Sign out';
  });
  $scope.$on(AUTH_EVENTS.logoutSuccess, function() {
      console.log('applicationController.logoutSuccess*****');
      Session.destroy();
      $scope.btnLogInOut = 'Sign in';
      $scope.loggedIn = false;
  });
      var onMovieListComplete = function(response){
      $scope.movies = response;
      $scope.gridOptions = {
          data: 'movies',
          plugins: [new ngGridFlexibleHeightPlugin()]
      };
    }
    var onError = function(reason){
        console.log('In onError' + reason);
        $scope.error = 'Could not load list!';
    }

  MovieService.getMovies().then(onMovieListComplete,onerror);

  // grid settings
  $scope.gridConfig = {
      isPaginationEnabled: false,
      isGlobalSearchActivated: true
  };
  $scope.gridOptions = {plugins: [new ngGridFlexibleHeightPlugin()]};
  $scope.gridHeader = [
      {label:'movieid', map: 'nummer' }  ,
      {label:'title', map: 'Title' }  ,
      {label:'year', map: 'Year' }  ,
      {label:'type', map: 'media' }  ,
      {label:'genres', map: 'Genres' }  ,
  ];

  
}   


app.controller('ApplicationController',ApplicationController);


}());
