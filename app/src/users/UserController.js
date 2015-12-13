(function(){

    angular
        .module('users')
        .controller('UserController', UserController);

    UserController.$inject = ['$scope', 'userService', '$mdSidenav', '$log', '$q'];

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function UserController( $scope, userService, $mdSidenav, $log, $q) {
        $scope.selected = $scope.selected || userService.getSelected();

        var self = this;

//        self.selected     = null;
        self.users        = [ ];
        self.selectUser   = selectUser;
        self.toggleList   = toggleUsersList;

        // Load all registered users

        userService
            .loadAllUsers()
            .then( function( users ) {
                self.users    = [].concat(users);
                $scope.selected = users[0];
                userService.setSelected( $scope.selected );
            });

        // *********************************
        // Internal methods
        // *********************************

        /**
         * First hide the bottomsheet IF visible, then
         * hide or Show the 'left' sideNav area
         */
        function toggleUsersList() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function(){
                $mdSidenav('left').toggle();
            });
        }

        /**
         * Select the current avatars
         * @param menuId
         */
        function selectUser ( user ) {
            $scope.selected = angular.isNumber(user) ? $scope.users[user] : user;
            userService.setSelected( $scope.selected );
            self.toggleList();
        }


    }

})();
