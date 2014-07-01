(function(){

    var MediumService = function($http,AuthService){

    var getList = function() {
        var onMediumsListComplete = function(response){
            console.log('In onMediumsListComplete' + response.data + ' || '+AuthService.isAuthenticated());
            //$scope.mediums = response.data;
            console.log('onMediumsListComplete.return: '+response.data);
            return response.data;
        }
        $http.post('http://localhost/movieserver/mediumsList.php')
                .then(onMediumsListComplete, onError);
        
        var onError = function(reason){
            console.log('In onError' + reason);
           // $scope.error = 'Could not load list!';
        }

    };

    var getMediums = function(){
            var mediumsList;
            var mediumUrl = 'http://localhost/movieserver/mediumsList.php';
        
        console.log('getMediums isAuthenticated: ' + AuthService.isAuthenticated());
//            return  $http.post(mediumUrl, AuthService.isAuthenticated())
            return  $http({
                    url: mediumUrl,
                    method: "POST",
//                    data: {isAuthenticed: true},
                    data: {isAuthenticed: AuthService.isAuthenticated()},
                    //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(response){
                        mediums = response.data;
                        console.log('mediums.getMediums: '+response);
                        return mediums;
                    });
//            console.log('getMediums before return: ' + mediumsList);
//            return mediumsList;
        };

    return {
      //      getList: getList,
            getMediums: getMediums
        };        
    };
    
    var module = angular.module('movies_app');
    module.factory('MediumService', MediumService);
    
}());

