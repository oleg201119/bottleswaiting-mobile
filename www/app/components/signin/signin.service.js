(function() {
    'use strict';

    angular
        .module('bwcapp.signin')
        .factory('SigninService', SigninService);

    SigninService.$inject = ['Restangular', '$q', 'constant', '$sessionStorage', 'UserService'];

    function SigninService(Restangular, $q, constant, $sessionStorage, UserService) {

        var service = {};

        // Login
        service.login = function(email, password) {

            // Params for GET
            var params = {
                username: email,
                password: password,
                grant_type: 'password'
            };

            var headers = {
                'Authorization': 'Basic Y29uc3VtZXI6VXJwWjc0dUU=',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            };

            var deferred = $q.defer();

            Restangular.allUrl('oauth.token', constant.serviceUrl + '/oauth/token').get('', params, headers).then(
                function(response) {
                    console.log('Login response >>');
                    console.log(JSON.stringify(response));

                    $sessionStorage.oauth = {
                        access_token: response.access_token,
                        refresh_token: response.refresh_token
                    };

                    Restangular.setDefaultHeaders({
                        Authorization: "Bearer " + response.access_token
                    });

                    // Get user's profile
                    var user;
                    var self = Restangular.one('self');
                    if (!user) {
                        self.get().then(function(response) {
                            user = response;
                            console.log(JSON.stringify(user));
                        }, function(error) {
                            console.log(JSON.stringify(error));
                        });
                    }

                    deferred.resolve();
                },
                function(error) {
                    console.log('Login fail >>');
                    console.log(error);

                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        // Logout
        service.logout = function() {

            // Params for POST
            var params = "";
            params += 'token=' + $sessionStorage.oauth.access_token;

            var headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };

            var deferred = $q.defer();

            Restangular.allUrl('oauth.revoke', constant.serviceUrl + '/oauth/revoke').post(params, {}, headers).then(
                function() {
                    delete $sessionStorage.oauth;
                    Restangular.setDefaultHeaders({});
                    UserService.clearUser();

                    deferred.resolve();
                },
                function() {
                    deferred.reject();
                }
            );

            return deferred.promise;
        }

        // Forgot password
        service.resetPassword = function(email) {

            // Params for POST
            var params = {
                email: email,
                password: ""
            };

            var deferred = $q.defer();

            Restangular.allUrl('passwordResetToken', constant.serviceUrl + '/' + constant.serviceAPIPath + '/passwordResetToken').post(params).then(
                function() {
                    deferred.resolve();
                },
                function() {
                    deferred.reject();
                }
            );

            return deferred.promise;
        }

        return service;
    }
})();