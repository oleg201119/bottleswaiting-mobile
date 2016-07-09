(function() {
    'use strict';

    angular
        .module('bwcapp.signup')
        .factory('SignupService', SignupService);

    SignupService.$inject = ['Restangular', 'constant', '$sessionStorage', 'UserService'];

    function SignupService(Restangular, constant, $sessionStorage, UserService) {

        var service = {};

        // Signup
        service.signup = function(user) {

            UserService.createUser(user).then(
                function(response) {
                    console.log('createUser >>');
                    console.log(response);
                },
                function(error) {
                    console.log('createUser >>');
                    console.log(error);
                }
            );
        }

        return service;
    }
})();