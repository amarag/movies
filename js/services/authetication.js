(function(){
    // service
    var AuthService = function($http){
        var login = function(credentials) {
        var loginUrl = 'http://localhost/movies7/downloadJSON/json';
        
        return  $http({
                    url: loginUrl,
                    method: "POST",
                    data: {
                        credentials: credentials,
                        action: 'login',
                        },
                }).then(function(response){
                        login = response.data;
                        return login;
                    });
        };

        var logout = function() {
        var logoutUrl = 'http://localhost/movies7/downloadJSON/json';
        
        return  $http({
                    url: logoutUrl,
                    method: "POST",
                    data: {
                        action: 'logout',
                        },
                }).then(function(response){
                        logout = response.data;
                        return logout;
                    });
        };

        var isAuthenticated = function(){
//            console.log('authetication.isAuthenticated:' + !!Session.userName);
//            return !!Session.userName;
        };
        
        var isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
              authorizedRoles = [authorizedRoles];
            }
            //return (this.isAuthenticated() &&
            //return (isAuthenticated() &&
            //  authorizedRoles.indexOf(Session.userRole) !== -1);
        };
            
    return {
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized
        };        
    };
    
    var module = angular.module('movies_app');
    module.factory('AuthService', AuthService);
    
}());