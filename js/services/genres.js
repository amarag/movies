(function(){

var GenreService = function($http,AuthService){

    var getGenres = function(){
        var genresList;
//        var GenreUrl = 'http://localhost/movieserver/genresList.php';
        var GenreUrl = 'http://localhost/movies7/downloadJSON/json';
        
        return  $http({
                    url: GenreUrl,
                    method: "POST",
                    data: {
                        //isAuthenticed: AuthService.isAuthenticated(),
                        action: 'getGenreList',
                        },
                }).then(function(response){
                        genres = response.data;
                        //console.log('genres.getGenres: '+response.data);
                        return genres;
                    });
        };

    return {
            getGenres: getGenres
        };        
    };
    
    var module = angular.module('movies_app');
    module.factory('GenreService', GenreService);
    
}());

