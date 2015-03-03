define(function() {
    var UserAuthenticationService = function(Base64Service, $http, $window, $rootScope) {

        var login = function(username, password, callback) {

                return $http.post('/api/users/' + username, {}, {
                    headers: {
                        'Authorization': 'Basic ' + Base64Service.encode(username + ':' + password)
                    }
                })
            },
            setCredentials = function(username, password) {
                var authdata = Base64Service.encode(username + ':' + password)

                $rootScope.globals = {
                    currentUser: {
                        username: username,
                        authdata: authdata
                    }
                }

                $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata

                $window.sessionStorage.setItem('username', $rootScope.globals.currentUser.username)
                $window.sessionStorage.setItem('authdata', $rootScope.globals.currentUser.authdata)
            },
            clearCredentials = function() {
                $rootScope.globals = {}

                $window.sessionStorage.removeItem('username')
                $window.sessionStorage.removeItem('authdata')

                $http.defaults.headers.common.Authorization = 'Basic '
            }

        return {
            login: login,
            setCredentials: setCredentials,
            clearCredentials: clearCredentials
        }
    }

    UserAuthenticationService.$inject = ['Base64Service', '$http', '$window', '$rootScope']

    return UserAuthenticationService
})
