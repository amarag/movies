(function(){

var app = angular.module('movies_app');

var ApplicationController = function ($scope, USER_ROLES, AuthService,AUTH_EVENTS,MediumService
                            , MovieService, GenreService,jsonFactory) {
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
      //console.log('applicationController.loginSuccess*****');
      $scope.loggedIn = true;
      $scope.btnLogInOut = 'Sign out';
  });
  $scope.$on(AUTH_EVENTS.logoutSuccess, function() {
      //console.log('applicationController.logoutSuccess*****');
      //Session.destroy();
      $scope.btnLogInOut = 'Sign in';
      $scope.loggedIn = false;
  });
  
    // AngularJS Factory returns the contents of JSON file to the controller.
    // Uses promise and deferred APIs
    $scope.otherStuff = {};
    jsonFactory.getOtherStuff().then(function (response) {
        $scope.author = response.data.app_author;
        $scope.version = response.data.app_version;
        $scope.versiondate = response.data.app_versiondate;
        $scope.name = response.data.app_name;
        //console.log('Config read: ' + JSON.stringify(JSON.decycle(response.data)));
        //console.log('Config read: author: [' + $scope.author + '] version: [' + $scope.version + ']');
    }, function (error) {
        console.error(error);
    });

  
}   

app.controller('ApplicationController',ApplicationController);

}());
