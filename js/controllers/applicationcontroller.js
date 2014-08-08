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
  $scope.mySelections = [];
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
  
    var onMovieListComplete = function(response){
        $scope.movies = response;
       // $scope.data = response;
    }
    var onGenresListComplete = function(response){
//        console.log('In onGenresListComplete' + response.data);
        $scope.genres = response;
//        console.log($scope.genres);
    };

    var onMediumsListComplete = function(response){
        //console.log('In onMediumsListComplete' + response + ' || '+AuthService.isAuthenticated());
        $scope.mediums = response;
     //   console.log($scope.mediums);
    };
    
  var onError = function(reason){
        console.log('In onError' + reason);
        $scope.error = 'Could not load list!';
    }

    // gives initial page lay-out filled    
  GenreService.getGenres().then(onGenresListComplete,onerror);
  MediumService.getMediums().then(onMediumsListComplete,onerror);
  MovieService.getMovies().then(onMovieListComplete,onerror);

  $scope.filterOptions = {
        filterText: '',
    };
  
}   

app.controller('ApplicationController',ApplicationController);

}());
