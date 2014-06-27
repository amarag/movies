/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function(){

var app = angular.module('movies_app', []);

var MovieListController = function ($scope, $http) {
    console.log('Start MovieListController');

    var onMovieListComplete = function(response){
        console.log('In onMovieListComplete' + response);
        $scope.movies = response.data;
    }
    var onGenresListComplete = function(response){
        console.log('In onGenresListComplete' + response.data);
        $scope.genres = response.data;
        console.log($scope.genres);
    }
    var onMediumsListComplete = function(response){
        console.log('In onMediumsListComplete' + response.data);
        $scope.mediums = response.data;
        console.log($scope.mediums);
    }
    var onError = function(reason){
        console.log('In onError' + reason);
        $scope.error = 'Could not load list!';
    }

    $http.get('http://localhost/movieserver/movieList.php')
                .then(onMovieListComplete, onError);
    $http.get('http://localhost/movieserver/genresList.php')
                .then(onGenresListComplete, onError);
    $http.get('http://localhost/movieserver/mediumsList.php')
                .then(onMediumsListComplete, onError);
        
    console.log('end MovieListController');

}
app.controller('MovieListController',MovieListController);


}());
