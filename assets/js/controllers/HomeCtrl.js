app.controller('HomeCtrl', function($scope, $auth, $state, Account){
    $scope.logout = function() {
        $auth.logout();
        $state.go('login');
    };

    Account.getProfile().success(function(data) {
        $scope.user = data[0];
    });
})