(function(){

var app = angular.module('movies_app');

var MainpageController = function ($scope, $http,AuthService, MediumService, MovieService
                                    , GenreService,AUTH_EVENTS,$location, $filter) {
    //console.log('Start MainpageController');
    $scope.btnLogInOut = 'Sign in';
    $scope.sortorder = 'name';

    var onMoviesListComplete = function(response){
        //console.log('In onMovieListComplete' + response);
        $scope.movies = response;
    };
    
    var onCountComplete = function(response){
//      console.log('In onCountComplete' + JSON.stringify(JSON.decycle(response)));
      $scope.moviescount = response;
      $scope.getTotals = function(){
          var total = 0;
          for (var i=0; i < $scope.moviescount.length;i++){
              total += parseInt($scope.moviescount[i].number,0);
          }
          return total;
      }
      };
    
    var onGenresListComplete = function(response){
//        console.log('In onGenresListComplete' + response.data);
        $scope.genres = response;
    };

    var onMediumsListComplete = function(response){
        //console.log('In onMediumsListComplete' + response + ' || '+AuthService.isAuthenticated());
        $scope.mediums = response;
    };
    
    var onError = function(reason){
        console.log('In onError' + reason);
        $scope.error = 'Could not load list!';
    }

    // check if movies exists If so roundtrip is not needed.
    if ($scope.movies === undefined) {
        //console.log('mainpagecontroller.scope.movies undefined');
        GenreService.getGenres().then(onGenresListComplete,onerror);
        MediumService.getMediums().then(onMediumsListComplete,onerror);
        MovieService.getMovies().then(onMoviesListComplete,onerror);
        MovieService.getCount().then(onCountComplete,onerror);
    }
    
    // after login successfully handle event: show new lists
    $scope.$on(AUTH_EVENTS.loginSuccess, function(){
        console.log('Event loginSucces');
        
        MovieService.getMovies().then(onMoviesListComplete,onerror);
        MovieService.getCount().then(onCountComplete,onerror);
        MediumService.getMediums().then(onMediumsListComplete,onerror);
        GenreService.getGenres().then(onGenresListComplete,onerror);
    });
    $scope.$on(AUTH_EVENTS.logoutSuccess, function(){
        MovieService.getMovies().then(onMoviesListComplete,onerror);
        MovieService.getCount().then(onCountComplete,onerror);
        MediumService.getMediums().then(onMediumsListComplete,onerror);
        GenreService.getGenres().then(onGenresListComplete,onerror);
    });

    $scope.selectMedium = function(medium) {
        //console.log('mainpagecontroller.selectMedium: '+ medium.md + ' checked: ' + medium.checked);
        if (medium.checked) {
            $scope.mediumfilter = medium.md;
        } else {
            $scope.mediumfilter = '';
        }
    }

    $scope.selectGenre = function(genre) {
        //console.log('mainpagecontroller.selectGenre: '+ genre.gn + ' checked: ' + genre.checked);
        if (genre.checked) {
            $scope.genrefilter = genre.gn;
        } else {
            $scope.genrefilter = '';
        }
    }

    $scope.setSelected = function(nid) {
        MovieService.setMovieParamId(nid);
        $location.path('/view');
    };    
}

app.controller('MainpageController',MainpageController);

}());