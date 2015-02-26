define(['app', 'services/base64'], function(app) {
    var injectParams = ['Base64', '$http', '$window', '$rootScope'],
        authFactory = function(Base64, $http, $window, $rootScope) {

            var service = {};

            service.login = function(username, password, callback) {

                return $http.post('/api/users/' + username, {}, {
                    headers: {
                        'Authorization': 'Basic ' + Base64.encode(username + ':' + password)
                    }
                });
            };

            service.setCredentials = function(username, password) {
                var authdata = Base64.encode(username + ':' + password);

                $rootScope.globals = {
                    currentUser: {
                        username: username,
                        authdata: authdata
                    }
                };

                $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

                $window.sessionStorage.currentUser = $rootScope.globals.currentUser;
            };

            service.clearCredentials = function() {
                $rootScope.globals = {};

                delete $window.sessionStorage.currentUser;

                $http.defaults.headers.common.Authorization = 'Basic ';
            };

            return service;
        }

    authFactory.$inject = injectParams;

    app.register.factory('AuthenticationService', authFactory);
})
