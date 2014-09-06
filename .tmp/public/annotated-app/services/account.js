app.factory('Account', ['$http', '$auth', function($http, $auth) {
    return {
      getProfile: function() {
        return $http.get('/user/me');
      }
    };
}]);