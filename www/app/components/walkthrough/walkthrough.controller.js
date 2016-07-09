(function() {
    'use strict';

    angular
        .module('bwcapp.walkthrough')
        .controller('WalkthroughController', WalkthroughController);

    WalkthroughController.$inject = ['$scope', '$state'];

    function WalkthroughController($scope, $state) {

        $scope.goEventList = function() {
            $state.go('home.eventlist');
        }
    }
})();