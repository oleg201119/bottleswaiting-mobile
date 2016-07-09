(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('PaymentController', PaymentController);

    PaymentController.$inject = ['$scope', '$state', '$ionicPopover', '$ionicModal'];

    function PaymentController($scope, $state, $ionicPopover, $ionicModal) {
        $scope.copayerlist = [{
        	avatar: 'img/temp-avatar.png',
        	name: 'James Baits',
        	tel: '317-213-1412'
        }, {
        	avatar: 'img/temp-avatar1.png',
			name: 'Sam White',
        	tel: '217-113-1412'
        }];

        $ionicModal.fromTemplateUrl('addcopayer-Modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.addcopayerModal = modal;
		});

		$ionicModal.fromTemplateUrl('addnewcopayer-Modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.addnewcopayerModal = modal;
		});

		$scope.goSplitPayment = function () {
			$state.go('home.split-payment');
		};

		$scope.goCreditCard = function () {

		};

        // Sidemenu
        $scope.openSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.init = function() {
            $ionicPopover.fromTemplateUrl('app/components/home/popover.template.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });
        };

        // Popover
        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };

        $scope.closePopover = function() {
            $scope.popover.hide();
        };

        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });

        $scope.openAddCoPayer = function () {
    		$scope.addcopayerModal.show();
        };

        $scope.showContactList = function () {

        };

        $scope.showManual = function () {
        	$scope.addcopayerModal.hide();
    		$scope.addnewcopayerModal.show();
        };

        $scope.cancelAddCopayer = function () {
			$scope.addnewcopayerModal.hide();
        };

		$scope.AddCopayer = function () {
			alert("AddCopayer");
        };        

        //Cleanup the modal when we're done with it!
		$scope.$on('$destroy', function() {
			$scope.addcopayerModal.remove();
    		$scope.addnewcopayerModal.remove();
		});

        $scope.init();
    }
})();