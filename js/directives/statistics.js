/* 
 * directive for showing statistics on main page
 */
angular.module('movies_app')
.directive('mvsStatistics', function() {
   return {
       restrict: 'AE',
       replace: true,
       templateUrl: 'js/partials/statistics.html'
   }; 
});

