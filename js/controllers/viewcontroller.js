/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function(){

var app = angular.module('movies_app');

var ViewController = function ($scope,MovieService) {
    $scope.detailsID = MovieService.getMovieParamId();
    //console.log('Start ViewController->id: ' + $scope.detailsID);
    //console.log(JSON.stringify(JSON.decycle($scope)));
    var onMovieListComplete = function(response){
//        console.log('In onMovieListComplete' + response);
      $scope.movie = response;
    };
    var onError = function(reason){
        console.log('In onError' + reason);
        $scope.error = 'Could not load movie!';
    };

    MovieService.getMovie($scope.detailsID).then(onMovieListComplete,onerror);

    console.log('end ViewController');

}
app.controller('ViewController',ViewController);


}());
