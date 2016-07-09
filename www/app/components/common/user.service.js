(function() {
    'use strict';

    angular
        .module('bwcapp.common')
        .factory('UserService', UserService);

    UserService.$inject = ['Restangular', 'constant', '$localStorage', '$q'];

    function UserService(Restangular, constant, $localStorage, $q) {

        var service = {};

        // User object
        var user;

        // Create new user
        service.createUser = function(user) {
            var userCopy = Restangular.copy(user);

            userCopy.role = "ROLE_CONSUMER";
            userCopy.dateOfBirth = new Date('1982/01/09');
            userCopy.dateOfBirth = userCopy.dateOfBirth.getTime();

            return Restangular.all('users').post(userCopy);
        }

        // Set current user
        service.setCurrentUser = function() {

        }

        // Get current user
        service.getCurrentUser = function() {

            var deferred = $q.defer();

            if (!user) {
                Restangular.one('self').get().then(
                    function(response) {
                        user = response;
                        deferred.resolve(user);
                    }, function(error) {
                        deferred.reject(error);
                    }
                );
            }
            else {
                deferred.resolve(user);
            }

            return deferred.promise;
        }

        // Clear user
        service.clearUser = function() {

        }

        return service;
    }
})();