app.factory('Account', function($http, $auth) {
    return {
      getProfile: function() {
        return $http.get('/user/me');
      }
    };
});