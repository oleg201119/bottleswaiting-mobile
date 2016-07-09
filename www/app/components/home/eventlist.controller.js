(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('EventListController', EventListController);

    EventListController.$inject = ['$scope', '$state', '$ionicSideMenuDelegate', '$ionicPopover', 'EventService'];

    function EventListController($scope, $state, $ionicSideMenuDelegate, $ionicPopover, EventService) {

        $scope.dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
        $scope.expandCalendar = false;
        $scope.allDays = [];
        $scope.panelDays = [];
        $scope.barDays = [];

        $scope.weeks = [];
        $scope.week1 = [];
        $scope.week2 = [];
        $scope.week3 = [];
        $scope.week4 = [];

        console.log('=====================>');

        var monthNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];

        function getMonthDays(year, month) {
            if (month == 1){
                if ( (year%100!=0) && (year%4==0) || (year%400==0)){
                    return 29;
                }else{
                    return 28;
                }
            }
            else if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
                return 31;
            }
            else {
                return 30;
            }
        }

        $scope.initCalendar = function() {

            // Get current date
            var dateNow = new Date();
            var year = dateNow.getFullYear();
            var month = dateNow.getMonth();
            var day = dateNow.getDate();

            var weekdays= dateNow.getDay();

            $scope.weeks.length = 4;

            for(var i=0; i<4; i++) {
                var firstDay = new Date();

                firstDay.setDate(day - weekdays + 1);

                day = day + 7;

                $scope.weeks[i] = [];
                $scope.weeks[i].length = 7;
                for(var dayIndex=0; dayIndex<7; dayIndex++) {

                    var weekDay = new Date(firstDay);
                    weekDay.setDate(firstDay.getDate() + dayIndex);

                    $scope.weeks[i][dayIndex] = weekDay;
                }
            }

            console.log($scope.weeks);

        }

        $scope.setDays = function() {


        }

        $scope.toggleCalendar = function() {

            $scope.expandCalendar = !$scope.expandCalendar;
        }

        $scope.selectPanelDay = function() {
            $scope.expandCalendar = false;
        }

        // Like/Unlike action
        $scope.reverseLike = function(index) {
            $scope.events[index].like = !$scope.events[index].like;

            // Save
        }

        // Go to the headliner profile page
        $scope.goEntertainerProfile = function() {

        }

        // Go to the event detail page
        $scope.goEventDetail = function(eventId) {
            $state.go('home.eventdetail', {eventId: eventId});
        };

        // Go to the Order more page
        $scope.goOrderMore = function () {
            $state.go('home.ordermore');
            $scope.closePopover();
        };

        // Sidemenu
        $scope.openSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        }

        $scope.init = function() {
            $ionicPopover.fromTemplateUrl('app/components/home/popover.template.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });
        }

        // Popover
        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        }

        $scope.closePopover = function() {
            $scope.popover.hide();
        }

        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });

        // Test data
        $scope.events = [
            {
                banner: 'img/temp-event-banner0.png',
                avatar: 'img/temp-event-avatar.png',
                eventName: 'Proper Saturday',
                venueName: 'Marquee',
                entertainerName: 'DJ Vice',
                musicType: 'Hip Hop',
                promotionText: 'Sold out',
                like: true
            },
            {
                banner: 'img/temp-event-banner1.png',
                avatar: 'img/temp-event-avatar.png',
                eventName: 'Super Saturday',
                venueName: 'Hakkasan',
                entertainerName: 'Steve Aoiki',
                musicType: 'Top40',
                promotionText: '',
                like: false
            },
            {
                banner: 'img/temp-event-banner2.png',
                avatar: 'img/temp-event-avatar.png',
                eventName: 'Proper Saturday',
                venueName: 'Marquee',
                entertainerName: 'DJ Vice',
                musicType: 'Hip Hop',
                promotionText: '1 Table left',
                like: true
            },
            {
                banner: 'img/temp-event-banner3.png',
                avatar: 'img/temp-event-avatar.png',
                eventName: 'Super Saturday',
                venueName: 'Hakkasan',
                entertainerName: 'Steve Aoiki',
                musicType: 'Top40',
                promotionText: '',
                like: true
            },
            {
                banner: 'img/temp-event-banner1.png',
                avatar: 'img/temp-event-avatar.png',
                eventName: 'Proper Saturday',
                venueName: 'Marquee',
                entertainerName: 'DJ Vice',
                promotionText: '',
                musicType: 'Hip Hop'
            },
            {
                banner: 'img/temp-event-banner3.png',
                avatar: 'img/temp-event-avatar.png',
                eventName: 'Super Saturday',
                venueName: 'Hakkasan',
                entertainerName: 'Steve Aoiki',
                musicType: 'Top40',
                promotionText: 'Sold out',
                like: false
            }
        ];

        $scope.events = [];
        EventService.getEventList('', new Date('2015-12-01'), new Date('2016-12-31')).then(
            function(response) {

                angular.forEach(response, function(value, key) {
                    $scope.events.push({
                        banner: value.croppedUrl,
                        avatar: value.entertainers[0].avatarUrl,
                        eventId: value.eventId,
                        eventName: value.name,
                        venueId: value.venueId,
                        venueName: value.venueName,
                        entertainerName: value.entertainers[0].name,
                        musicType: value.musicType,
                        promotionText: '',
                        like: false
                    });
                });

                console.log($scope.events);
            },
            function(error) {

            }
        );

        // Init
        $scope.initCalendar();
        $scope.init();
    }
})();