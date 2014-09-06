app.controller('LoginCtrl', ['$scope', '$auth', function($scope, $auth){
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider);
    };
}]);