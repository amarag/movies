(function(){

var MediumService = function($http,AuthService){

    var getMediums = function(){
        var mediumsList;
        //var mediumUrl = 'http://localhost/movieserver/mediumsList.php';
        var mediumUrl = 'http://localhost/movies7/downloadJSON/json';
        
        return  $http({
                    url: mediumUrl,
                    method: "POST",
                    data: {
                        //isAuthenticed: AuthService.isAuthenticated(),
                        action: 'getMediumList',
                        },
                }).then(function(response){
                        mediums = response.data;
                        //console.log('mediums.getMediums: '+response.data);
                        return mediums;
                    });
        };

    return {
            getMediums: getMediums
        };        
    };
    
    var module = angular.module('movies_app');
    module.factory('MediumService', MediumService);
    
}());

