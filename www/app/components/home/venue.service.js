(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .factory('VenueService', VenueService);

    VenueService.$inject = ['Restangular', 'constant', '$q'];

    function VenueService(Restangular, constant, $q) {

        var service = {};
        var venues = [];

        // Get venue list
        service.getVenueList = function(city, startDate, endDate) {

            // Params for GET
            var params = {
                city: city,
//                activeEvent : true
                active : true
            };

            return Restangular.all('venue').get('', params).then(function(response) {
//            return Restangular.all('venue').getList().then(function(response) {
                console.log('Venue List response >>');
                console.log(response);

                return response;
            });
        }


        // Get venue celebrity
        service.getVenueCelebrity = function(venueId) {

            var params = {
                aCarteAllowed : true
            };
            var deferred = $q.defer();

            if (venues[venueId]) {
                deferred.resolve(venues[venueId]);
            }
            else {
                Restangular.allUrl('venue.celebration', constant.serviceUrl + '/' + constant.serviceAPIPath + '/venue/'+venueId + '/celebration').get('', params).then(
                    function(response) {
                        venues[venueId] = response;
                        deferred.resolve(response);
                    },
                    function(error) {
                        deferred.reject(error);
                    }
                );
            }
            return deferred.promise;
        }

        // Get favorite venue list
        service.getFavoriteVenueList = function() {

            // Params for GET
            var params = {};

            var deferred = $q.defer();

            Restangular.allUrl('users.favorite.venue', constant.serviceUrl + '/' + constant.serviceAPIPath + '/users/favorite/venue').get('', params).then(
                function(response) {
                    console.log('FavoriteVenueList >>');
                    console.log(response);

                    deferred.resolve(response);
                },
                function(error) {
                    console.log('FavoriteVenueList >>');
                    console.log(JSON.stringify(error));

                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        // Get venue
        service.getVenue = function(venueId) {

            var deferred = $q.defer();

            if (venues[venueId]) {
                deferred.resolve(venues[venueId]);
            }
            else {
                Restangular.one('venue', venueId).get().then(
                    function(response) {
                        venues[venueId] = response;
                        deferred.resolve(response);
                    },
                    function(error) {
                        deferred.reject(error);
                    }
                );
            }
            return deferred.promise;
        }

        // Get Pass from VenueId
        service.getPassFromVenueId = function(venueId) {

            var params = {};

            var deferred = $q.defer();

            Restangular.allUrl('venue.pass', constant.serviceUrl + '/' + constant.serviceAPIPath + '/venue/' + venueId + '/pass').get('', params).then(
                function(response) {
                    venues[venueId] = response;
                    deferred.resolve(response);
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        return service;
    }
})();