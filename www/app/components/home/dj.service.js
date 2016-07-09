(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .factory('DJService', DJService);

    DJService.$inject = ['Restangular', 'constant', '$q'];

    function DJService(Restangular, constant, $q) {

        var service = {};

        // Get DJ Profile
        service.getDJProfile = function(profileId) {

            // Params for GET
            var params = {};

            var deferred = $q.defer();

            Restangular.one('dj', profileId).get().then(
                function(response) {
                    console.log('getDJProfile >>');
                    console.log(response);

                    deferred.resolve(response);
                },
                function(error) {
                    console.log('getDJProfile >>');
                    console.log(JSON.stringify(error));

                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }


        // Search DJ
        service.searchDJWithName = function(name) {

            // Params for GET
            var params = {
                name: name
            };

            var deferred = $q.defer();

            Restangular.allUrl('dj.search', constant.serviceUrl + '/' + constant.serviceAPIPath + '/dj/search').get('', params).then(
                function(response) {
                    console.log('FavoriteEventList >>');
                    console.log(response);

                    deferred.resolve(response);
                },
                function(error) {
                    console.log('FavoriteEventList >>');
                    console.log(JSON.stringify(error));

                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        return service;
    }
})();