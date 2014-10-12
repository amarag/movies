/* 
 * http://programmaticponderings.wordpress.com/2014/03/24/retrieving-and-displaying-data-with-angularjs-and-the-mean-stack-part-ii-2/
 * Nodig voor uitlezen config file
 */
'use strict';
angular.module('movies_app')
    .factory('jsonFactory', function ($q, $http) {
    return {
        getOtherStuff: function () {
            var deferred = $q.defer(),
            httpPromise = $http.get('data/config.json');
            httpPromise.then(function (response) {
            deferred.resolve(response);
            }, function (error) {
                console.error(error);
            });
        return deferred.promise;
        }
    };
});