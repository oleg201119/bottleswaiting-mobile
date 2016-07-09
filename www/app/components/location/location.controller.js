(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('LocationController', LocationController);

    LocationController.$inject = ['$scope', '$state'];

    function LocationController($scope, $state) {

        // Focus
        $scope.focusMonth = false;
        $scope.focusDay = false;
        $scope.focusYear = false;

        $scope.focusCountry = false;
        $scope.focusState = false;
        $scope.focusCity = false;

        // Registered cities
        $scope.cities = [
            "Denver",
            "Scottsdale",
            "San Diego"
        ];

        // Selected city
        $scope.selectedCity = -1;

        // Select city radio
        $scope.selectCity = function(cityIndex) {
            $scope.selectedCity = cityIndex;
        }


        // Year/Month/Day
        $scope.years = [];

        $scope.months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        $scope.selectedDate = {

        };

        // Suggest city
        $scope.suggest = {
            country: 'United States',
            state: 'Nevada',
            city: 'Las vegas'
        };

        $scope.countries = [
            "United States"
        ];

        $scope.states = [
            "Nevada"
        ];

        // Next button action
        $scope.doNext = function() {

            console.log($scope.selectedDate);

        }

        // Init
        $scope.init = function() {
            // Get today's date
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth();
            var yyyy = today.getFullYear();

            $scope.years.push(yyyy);
            $scope.years.push(yyyy + 1);

            $scope.selectedDate = {
                year: yyyy.toString(),
                month: $scope.months[mm],
                day: dd
            };
        }

        $scope.init();
    }
})();