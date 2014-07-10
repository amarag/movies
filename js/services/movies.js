(function(){

var MovieService = function($http,AuthService){

    var getMovies = function(){
        var movies;
        var movieUrl = 'http://localhost/movieserver/movieList.php';
        
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

    return {
            getMovies: getMovies
        };        
    };
    
    var module = angular.module('movies_app');
    module.factory('MovieService', MovieService);
    
}());

