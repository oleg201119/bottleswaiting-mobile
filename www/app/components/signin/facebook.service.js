(function() {
    'use strict';

    angular
        .module('bwcapp.signin')
        .factory('FacebookService', FacebookService);

    FacebookService.$inject = ['Restangular', '$q', 'constant', '$sessionStorage', 'UserService', 'SigninService'];

    function FacebookService(Restangular, $q, constant, $sessionStorage, UserService, SigninService) {

        var service = {};

        // Build facebook login request
        var buildFBRequest = function(authResponse) {

            var deferred = $q.defer();

            facebookConnectPlugin.api('/me', ['public_profile', 'email'],
                function(response) {

                    deferred.resolve(
                        {
                            accessToken: authResponse.accessToken,
                            id: authResponse.userID,
                            firstName: response.first_name,
                            lastName: response.last_name,
                            email: response.email
                        }
                    );
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        // Login with facebook account
        var loginWithFB = function(fbRequest) {

            var deferred = $q.defer();

            Restangular.allUrl('oauth.facebook', constant.serviceUrl + '/oauth/facebook').post(fbRequest).then(
                function(response) {
                    deferred.resolve(
                        {
                            email: fbRequest.email,
                            password: response.passwordToken
                        }
                    );
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        // Logout
        service.logout = function() {
            facebookConnectPlugin.logout(
                function() {
                    console.log("log out !");
                },
                function() {
                    console.log("log out error");
                }
            );
        }

        // Login
        service.login = function() {

            var deferred = $q.defer();

            facebookConnectPlugin.getLoginStatus(
                function(response) {
                    if(response.status === 'connected') {
                        buildFBRequest(response.authResponse).then(
                            function(fbRequest) {
                                loginWithFB(fbRequest).then(
                                    function(response) {
                                        SigninService.login(response.email, response.password).then(
                                            function(response) {
                                                deferred.resolve(response);
                                            },
                                            function(error) {
                                                deferred.reject(
                                                    {
                                                        type: 'login',
                                                        error: error
                                                    }
                                                );
                                            }
                                        );
                                    },
                                    function(error) {
                                        deferred.reject(error);
                                    }
                                );
                            },
                            function(error) {
                                deferred.reject(error);
                            }
                        );
                    }
                    else {
                        facebookConnectPlugin.login(['public_profile', 'email'],
                            function(response) {
                                if (response.authResponse) {
                                    buildFBRequest(response.authResponse).then(
                                        function(fbRequest) {
                                            loginWithFB(fbRequest).then(
                                                function(response) {
                                                    SigninService.login(response.email, response.password).then(
                                                        function(response) {
                                                            deferred.resolve(response);
                                                        },
                                                        function(error) {
                                                            deferred.reject(
                                                                {
                                                                    type: 'login',
                                                                    error: error
                                                                }
                                                            );
                                                        }
                                                    );
                                                },
                                                function(error) {
                                                    deferred.reject(error);
                                                }
                                            );
                                        },
                                        function(error) {
                                            deferred.reject(error);
                                        }
                                    );
                                }
                                else {
                                    deferred.reject(
                                        {
                                            type: 'fb',
                                            error: response.error
                                        }
                                    );
                                }
                            },
                            function(error) {
                                deferred.reject(error);
                            }
                        )
                    }
                }
            )

            return deferred.promise;
        }

        // Get profile photo
        service.getUserPhoto = function() {

            var deferred = $q.defer();

            facebookConnectPlugin.api('/me?fields=picture', ['public_profile', 'email'],
                function(response) {
                    deferred.resolve(response.picture.data.url);

                }, function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }


        return service;
    }
})();