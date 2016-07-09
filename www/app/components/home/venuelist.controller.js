(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('VenueListController', VenueListController);

    VenueListController.$inject = ['$scope', '$state'];

    function VenueListController($scope, $state) {

        $scope.venues = [
            {
                banner: 'img/temp-event-banner0.png',
                avatar: 'img/temp-event-avatar.png',
                venueLocation: 'Las Vegas, NV',
                venueName: 'Marquee',
                like: true
            },
            {
                banner: 'img/temp-event-banner1.png',
                avatar: 'img/temp-event-avatar.png',
                venueLocation: 'Las Vegas, NV',
                venueName: 'Hakkasan',
                like: false
            },
            {
                banner: 'img/temp-event-banner2.png',
                avatar: 'img/temp-event-avatar.png',
                venueLocation: 'Las Vegas, NV',
                venueName: 'Marquee',
                like: true
            },
            {
                banner: 'img/temp-event-banner3.png',
                avatar: 'img/temp-event-avatar.png',
                venueLocation: 'Las Vegas, NV',
                venueName: 'Hakkasan',
                like: true
            },
            {
                banner: 'img/temp-event-banner1.png',
                avatar: 'img/temp-event-avatar.png',
                venueLocation: 'Las Vegas, NV',
                venueName: 'Marquee',
                like: true
            },
            {
                banner: 'img/temp-event-banner3.png',
                avatar: 'img/temp-event-avatar.png',
                venueLocation: 'Las Vegas, NV',
                venueName: 'Hakkasan',
                like: false
            }
        ];
    }
})();