(function(){

var app = angular.module('movies_app');

var ViewController = function ($scope,MovieService) {
    $scope.detailsID = MovieService.getMovieParamId();
    console.log('ViewController id: ' + $scope.detailsID);
    
    var onMovieGetComplete = function(response){
      $scope.movie = response;
//      console.log('ViewController.onMovieGetComplete:  ' + $scope.movie.title);
//        console.log('viewcontroller: '+ JSON.stringify(JSON.decycle($scope.movie)));
    };

    var onError = function(reason){
        console.log('In onError' + reason);
        $scope.error = 'Could not load movie!';
    };

    MovieService.getMovie($scope.detailsID).then(onMovieGetComplete,onerror);
}
app.controller('ViewController',ViewController);

}());
