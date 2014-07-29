(function(){
    // service
    var AuthService = function($http, Session){
        var login = function(credentials) {
            //console.log('in AuthService.login ' + credentials.username + ' || ' +credentials.password);
            return $http
                .post('http://localhost/movieserver/login.php', credentials)
                .then(function (res) {
                  //console.log('AuthService res =>' + 'id: '+ res.data.id + ' Username: ' + res.data.username + ' || role: ' + res.data.role)
                  if (typeof(res.data.username) != "undefined") {
                    Session.create(res.data.id, res.data.username,res.data.password,res.data.email, res.data.role
                                ,res.data.lastlogin,res.data.active,res.data.attempts,res.data.hashkey);
                                
                            } else {
                                // TODO errorhandling
                                Session.destroy();
                                //$scope.error = res.data;
                            }
                })
        };

        var isAuthenticated = function(){
//            console.log('authentication.isAuthenticated:' + !!Session.userName);
            return !!Session.userName;
        };
        
        var isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
              authorizedRoles = [authorizedRoles];
            }
      //      return (this.isAuthenticated() &&
            return (isAuthenticated() &&
              authorizedRoles.indexOf(Session.userRole) !== -1);
            };
        return {
            login: login,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized
        };
    };
    
    var module = angular.module('movies_app');
    module.factory('AuthService', AuthService);
    
}());