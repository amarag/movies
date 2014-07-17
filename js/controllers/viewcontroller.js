/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function(){

var app = angular.module('movies_app');

var ViewController = function ($scope) {
    console.log('Start ViewController' + $scope.id);
    console.log(JSON.stringify(JSON.decycle($scope)));

    console.log('end ViewController');

}
app.controller('ViewController',ViewController);


}());
