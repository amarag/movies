(function(){

var MovieService = function($http,AuthService){
    var paramId;
    
    var getMovies = function(){
        var movies;
        //var movieUrl = 'http://localhost/movieserver/movieList.php';
        var movieUrl = 'http://localhost/movies7/downloadJSON/json';
        
        return  $http({
                    url: movieUrl,
                    method: "POST",
                    data: {isAuthenticed: AuthService.isAuthenticated(),
                        },
                    //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(response){
                        movies = response.data;
                        console.log('movies.getMovies: '+response.data);
                        return movies;
                    });
        };

    var getMovie = function(id){
        var movie;
        var movieUrl = 'http://localhost/movieserver/movieGet.php';
        
        return  $http({
                    url: movieUrl,
                    method: "POST",
                    data: {isAuthenticed: AuthService.isAuthenticated(),
                        'id': id 
                        },
                    //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(response){
                        movie = response.data;
//                        console.log('movies.getMovies: '+response.data);
                        return movie;
                    });
    };
    
    var setMovieParamId = function (id) {
        paramId = id;
    };
    var getMovieParamId = function() {
        return paramId;
    };
    return {
            getMovies: getMovies,
            getMovie: getMovie,
            setMovieParamId: setMovieParamId,
            getMovieParamId: getMovieParamId,
        };        
    };
    
    var module = angular.module('movies_app');
    module.factory('MovieService', MovieService);
    
}());

