(function(){

var app = angular.module('movies_app');

var HomeController = function ($scope, $http,AuthService, MediumService, MovieService, GenreService,AUTH_EVENTS,$location) {
    //console.log('Start MovieListController');
    $scope.btnLogInOut = 'Sign in';
    $scope.sortorder = 'name';
    //$scope.queryMediaType.type = 'All';
//    $scope.filterOptions = {
//        filterText: '',
//    };

    var onMovieListComplete = function(response){
//        console.log('In onMovieListComplete' + response);
      $scope.movies = response;

        $scope.gridOptions = {
          data: 'movies',
          filterOptions: $scope.genresFilter,
          selectedItems: $scope.mySelection,
          rowTemplate: '<div ng-dblclick="onDblClickRow(row)" ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}"><div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div><div ng-cell></div></div>',
          //dbClickFn: $scope.myDblClickHandler,
          //plugins: [new ngGridFlexibleHeightPlugin(), ngGridDoubleClick],
          //dblClickFn: $scope.myDblClickHandler,
    //plugins: [ngGridDoubleClick]
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
        if (checkbox.checked == true) {
            $scope.filterOptions.filterText = genre;
        } else {
            $scope.filterOptions.filterText = '';
        }
        console.log('homecontroller->genresClick:' + checkbox.checked + ' || ' +$scope.filterOptions.filterText);
    }
    
    $scope.myDblClickHandler = function(rowItem) {
        console.log('DoubleClick');
    };
    $scope.onDblClickRow = function(row) {
        var found = false;
        var id = null;
        for(var key in row){
            var value = row[key];
            if (value instanceof Object === true) {
                for(var ikey in value) {
                    var ivalue = value[ikey];
                    if (ikey === 'movieid') {
                        console.log('Key: ' + ikey +' value: ' + ivalue);
                        id = ivalue;
                        found = true;
                        break;
                    }
                }
            }
            if (found) {
                break;
            }
        }
        if (found) {
            console.log('location.path = #view');
            $scope.JOSid = id;
            $location.path('/view/' + id);
        }
//        console.log('**DoubleClick2**' + JSON.stringify(JSON.decycle(row)));        
    }
}
app.controller('HomeController',HomeController);

}());
