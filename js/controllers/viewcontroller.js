(function(){

var app = angular.module('movies_app');

var ViewController = function ($scope,MovieService) {
    $scope.detailsID = MovieService.getMovieParamId();
    //console.log(JSON.stringify(JSON.decycle($scope)));

    var onMovieGetComplete = function(response){
      console.log('In onMovieGetComplete: ' + response.title);
      $scope.movie = response;
      console.log('onMovieGetComplete:  ' + $scope.movie);
    };

    var onError = function(reason){
        console.log('In onError' + reason);
        $scope.error = 'Could not load movie!';
    };

    MovieService.getMovie($scope.detailsID).then(onMovieGetComplete,onerror);

    //console.log('end ViewController');

}
app.controller('ViewController',ViewController);


}());
