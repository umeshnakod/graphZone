var app = angular.module('app',['ui.bootstrap','ui.router']);



app.controller('ctrl',['$scope','$modal',function ($scope,$modal) {
	$scope.selectedValue = 'Select DataBase';

	$scope.dataBase = ['mongoDB','Sql'];



	$scope.connectDatabase = function (db) {
		// body...
		$scope.selectedValue = db;
		$("#myModal").modal('show');
	}


}]);

app
	.run(function($rootScope, $state) {
            $rootScope.$on('$stateChangeError', function(evt, to, toParams, from, fromParams, error) {
          if (error.redirectTo) {
            $state.go(error.redirectTo);
          } else {
            $state.go('error', {status: error.status})
          }
        })
    })
	.factory('userService', userService)
	.config(routes);

function userService() {
	var usersMock = {
    	'testUser': {
        	username: 'testUser',
            password: '1234'
        },
        'testUser2': {
        	username: 'testUser2',
            password: '1234'
        }
    };
	var userService = {
    	user: undefined,
    	login: function(userCredentials) {
        	// later --> $http.post('auth', userCredentials).then(...)
            // for demo use local data
            var user = usersMock[userCredentials.username]
            userService.user = ( user && ( user.password == userCredentials.password ) ) ? 
            	user : undefined;
            return user;
        },
        logout: function() {
        	userService.user = undefined;
        }
    }
    
    return userService;
}
function routes($urlRouterProvider, $stateProvider) {

	
}

