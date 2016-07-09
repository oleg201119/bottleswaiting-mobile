(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('PopoverController', PopoverController);

    PopoverController.$inject = ['$scope', '$state'];

    function PopoverController($scope, $state) {

        $scope.handlePopover = function(item) {
            switch(item) {
                case 'order': {
                    console.log('Popover:order');
                    $state.go('home.ordermore');
                    this.closePopover();
                    break;
                }
                case 'calendar': {
                    console.log('Popover:calendar');
                    this.closePopover();
                    break;
                }
                case 'favorites': {
                    console.log('Popover:favorites');

                    $scope.popover.hide();
                    $state.go('home.favorites');

                    break;
                }
                case 'music': {
                    console.log('Popover:music');

                    $scope.popover.hide();
                    $state.go('home.music-search');

                    break;
                }
                case 'maps': {
                    console.log('Popover:maps');

                    $scope.popover.hide();
                    $state.go('home.map');

                    break;
                }
                case 'venues': {
                    console.log('Popover:venues');

                    $scope.popover.hide();
                    $state.go('home.venuelist');
                    break;
                }
                case 'location': {
                    console.log('Popover:location');

                    $scope.popover.hide();
                    $state.go('home.location');

                    break;
                }
                case 'walkthrough': {
                    console.log('Popover:walkthrough');

                    $scope.popover.hide();
                    $state.go('walkthrough');
                    break;
                }
            }
        }
    }
})();