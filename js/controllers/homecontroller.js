(function(){

var app = angular.module('movies_app');

var HomeController = function ($scope, $http,AuthService, MediumService, MovieService, GenreService,AUTH_EVENTS) {
    //console.log('Start MovieListController');
    $scope.btnLogInOut = 'Sign in';
    $scope.sortorder = 'name';
    //$scope.queryMediaType.type = 'All';
    $scope.genresCheck = 'All';

    var onMovieListComplete = function(response){
//        console.log('In onMovieListComplete' + response);
      $scope.movies = response;
//      $scope.movies = [
//          {name: 'Jos', age:'23'}
//      ];
        $scope.gridOptions = {
          data: 'movies',
        };
    }
    var onGenresListComplete = function(response){
//        console.log('In onGenresListComplete' + response.data);
        $scope.genres = response;
//        console.log($scope.genres);
    }
    var onMediumsListComplete = function(response){
        //console.log('In onMediumsListComplete' + response + ' || '+AuthService.isAuthenticated());
        $scope.mediums = response;
     //   console.log($scope.mediums);
    }
    var onError = function(reason){
        console.log('In onError' + reason);
        $scope.error = 'Could not load list!';
    }

//    $http.get('http://localhost/movieserver/genresList.php')
//                .then(onGenresListComplete, onError);

    // gives initial page lay-out filled    
    GenreService.getGenres().then(onGenresListComplete,onerror);
    MediumService.getMediums().then(onMediumsListComplete,onerror);
    
    // after login successfully handle event: show new lists
    $scope.$on(AUTH_EVENTS.loginSuccess, function(){
        MovieService.getMovies().then(onMovieListComplete,onerror);
        MediumService.getMediums().then(onMediumsListComplete,onerror);
    });
    $scope.$on(AUTH_EVENTS.logoutSuccess, function(){
        MovieService.getMovies().then(onMovieListComplete,onerror);
        MediumService.getMediums().then(onMediumsListComplete,onerror);
    });

    $scope.genresClick = function($event, genre) {
        var checkbox = $event.target;
        $scope.genresCheck = genre;
        console.log('homecontroller->genresClick:' + checkbox.checked + ' || ' +genre);
    }

}
app.controller('HomeController',HomeController);

}());
