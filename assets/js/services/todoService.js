app.factory('TodoService', function($http, $q, CurrentUser){
    return {
        getAll: function() {
            return $http.get('/user/' + CurrentUser.id + '/todos');
        },
        create: function(description) {
            var params = { description: description, done: false };
            return $http.post('/user/' + CurrentUser.id + '/todos', params);
        },
        remove: function(id) {
            return $http.delete('/todo/' + id);
          	// return $http.delete('/user/' + CurrentUser.id + '/todos/' + id);
        },
        update: function(id, description, done){

            if(description){
                return $http.put('/todo/' + id, { description: description });
            } else {
                return $http.put('/todo/' + id, { done: done });
            }
            // return $http.put('/user/' + CurrentUser.id + '/todos/' + id, { description: description, done: done });
        }
    }
});