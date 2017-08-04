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


app.config(function ($stateProvider) {
	
	$stateProvider
           .state('core', {
                url: '/zone/',
                views: {
                    "header": {
                        template: '<h1>Heyyyyy</h1>'
                    },
                    "": {
                        template: '<ui-view></ui-view>'
                    }
                }
            })
})

