app.controller('HomeCtrl', function($scope, $auth, $state){
    $scope.logout = function() {
        $auth.logout();
        $state.go('login');
    };
})