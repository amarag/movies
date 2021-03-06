(function(){

var app = angular.module('movies_app');

var HomeController = function ($scope, $http,AuthService, MediumService, MovieService, GenreService,AUTH_EVENTS,$location) {
    //console.log('Start MovieListController');
    $scope.btnLogInOut = 'Sign in';
    $scope.sortorder = 'name';

    var onMovieListComplete = function(response){
//        console.log('In onMovieListComplete' + response);
      $scope.movies = response;

    };
    
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

    // after login successfully handle event: show new lists
    $scope.$on(AUTH_EVENTS.loginSuccess, function(){
        MovieService.getMovies().then(onMovieListComplete,onerror);
        MediumService.getMediums().then(onMediumsListComplete,onerror);
        GenreService.getGenres().then(onGenresListComplete,onerror);
    });
    $scope.$on(AUTH_EVENTS.logoutSuccess, function(){
        MovieService.getMovies().then(onMovieListComplete,onerror);
        MediumService.getMediums().then(onMediumsListComplete,onerror);
        GenreService.getGenres().then(onGenresListComplete,onerror);
    });

    $scope.genresClick = function($event, genre) {
        var checkbox = $event.target;
        if (checkbox.checked == true) {
            $scope.filterOptions.filterText = genre;
        } else {
            $scope.filterOptions.filterText = '';
        }
        //console.log('homecontroller->genresClick:' + checkbox.checked + ' || ' +$scope.filterOptions.filterText);
    }
    
    $scope.onDblClickRow = function(row) {
        var found = false;
        var id = null;
        
        for(var key in row){
            var value = row[key];
            if (value instanceof Object === true) {
                for(var ikey in value) {
                    var ivalue = value[ikey];
                    if (ikey === 'nid') {
                        console.log('Key: ' + ikey +' value: ' + ivalue);
                        id = ivalue;
                        found = true;
                        break;
                    }
                }
            }
            if (found) {
                break;
            }
        }
        if (found) {
            MovieService.setMovieParamId(id);
            $location.path('/view');
        }
//        console.log('**DoubleClick2**' + JSON.stringify(JSON.decycle(row)));        
    }
}
app.controller('HomeController',HomeController);

}());
