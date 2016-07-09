(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .factory('EventService', EventService);

    EventService.$inject = ['Restangular', 'constant', '$q'];

    function EventService(Restangular, constant, $q) {

        var service = {};

        // Get event list
        service.getEventList = function(city, startDate, endDate) {

            // Params for GET
            var params = {
                city: city,
                greaterThanDate: startDate.toISOString(),
                lessThanDate: endDate.toISOString()
            };

            return Restangular.all('event').get('', params).then(function(response) {
                console.log('EventList response >>');
                console.log(response);

                return response;
            });
        }

        // Get favorite event list
        service.getFavoriteEventList = function() {

            // Params for GET
            var params = {};

            var deferred = $q.defer();

            Restangular.allUrl('users.favorite.event', constant.serviceUrl + '/' + constant.serviceAPIPath + '/users/favorite/event').get('', params).then(
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

        // Get event
        service.getEvent = function(eventId) {
            return Restangular.one('event', eventId).get().then(function(response) {
                console.log('Event response >>');
                console.log(response);

                return response;
            });
        }

        return service;
    }
})();