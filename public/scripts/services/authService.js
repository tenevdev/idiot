define(['app', 'services/base64'], function(app) {
    var injectParams = ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout'],
        authFactory = function(Base64, $http, $cookieStore, $rootScope, $timeout) {

            var service = {};

            service.login = function(username, password, callback) {

                return $http.put('/api/users/' + username, {}, {
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
                $cookieStore.put('globals', $rootScope.globals);
            };

            service.clearCredentials = function() {
                $rootScope.globals = {};
                $cookieStore.remove('globals');
                $http.defaults.headers.common.Authorization = 'Basic ';
            };

            return service;
        }

    authFactory.$inject = injectParams;

    app.register.factory('AuthenticationService', authFactory);
})
