(function(){
    'use strict';

    angular
        .module('users')
        .controller('UserDetailController', ['$scope','$stateParams','$mdBottomSheet', 'userService', function($scope, $stateParams, $mdBottomSheet, userService) {
            var self = this;

            self.selected = userService.find($stateParams.id);
            self.showContactOptions  = showContactOptions;


            /**
             * Show the bottom sheet
             */
            function showContactOptions($event) {
                var user = self.selected;

                return $mdBottomSheet.show({
                    parent: angular.element(document.getElementById('content')),
                    templateUrl: './src/users/templates/contactSheet.html',
                    controller: [ '$mdBottomSheet', ContactPanelController],
                    controllerAs: "cp",
                    bindToController : true,
                    targetEvent: $event
                }).then(function(clickedItem) {
                    clickedItem && $log.debug( clickedItem.name + ' clicked!');
                });

                /**
                 * Bottom Sheet controller for the Avatar Actions
                 */
                function ContactPanelController( $mdBottomSheet ) {
                    this.user = user;
                    this.actions = [
                        { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
                        { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
                        { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
                        { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
                    ];
                    this.submitContact = function(action) {
                        $mdBottomSheet.hide(action);
                    };
                }
            }
        }]);

})();

