(function(){

var app = angular.module('movies_app');

var MainpageController = function ($scope, $http,AuthService, MediumService, MovieService
                                    , GenreService,AUTH_EVENTS,$location) {
//    console.log('Start MainpageController');
    $scope.btnLogInOut = 'Sign in';
    $scope.sortorder = 'name';

    var onMoviesListComplete = function(response){
//      console.log('In onMovieListComplete' + response);
      $scope.movies = response;
//      $( ".movieList" ).append('<ul><li ng-repeat="movie in movies">{{movie.title}}</li></ul>' );
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

    // check if movies exists If so roundtrip is not needed.
    if ($scope.movies === undefined) {
        //console.log('mainpagecontroller.scope.movies undefined');
        MovieService.getMovies().then(onMoviesListComplete,onerror);
    }
    
    // after login successfully handle event: show new lists
    $scope.$on(AUTH_EVENTS.loginSuccess, function(){
        MovieService.getMovies().then(onMoviesListComplete,onerror);
        //MediumService.getMediums().then(onMediumsListComplete,onerror);
        GenreService.getGenres().then(onGenresListComplete,onerror);
    });
    $scope.$on(AUTH_EVENTS.logoutSuccess, function(){
        MovieService.getMovies().then(onMoviesListComplete,onerror);
        //MediumService.getMediums().then(onMediumsListComplete,onerror);
        GenreService.getGenres().then(onGenresListComplete,onerror);
    });

/*    $scope.genresClick = function($event, genre) {
        var checkbox = $event.target;
        if (checkbox.checked == true) {
            $scope.filterOptions.filterText = genre;
        } else {
            $scope.filterOptions.filterText = '';
        }
        //console.log('homecontroller->genresClick:' + checkbox.checked + ' || ' +$scope.filterOptions.filterText);
    }
*/    
    $scope.selectMedium = function(medium) {
        //console.log('mainpagecontroller.selectMedium: '+ JSON.stringify(JSON.decycle($scope.mediums)));
        console.log('mainpagecontroller.selectMedium: '+ medium.md + ' checked: ' + medium.checked);
    }

    $scope.selectGenre = function(genre) {
        console.log('mainpagecontroller.selectGenre: '+ genre.gn + ' checked: ' + genre.checked);
    }

    $scope.setSelected = function(nid) {
        MovieService.setMovieParamId(nid);
        $location.path('/view');
    };    
}
app.controller('MainpageController',MainpageController);

}());
