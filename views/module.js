var app = angular.module('app',['ui.bootstrap','ui.router','ngDragDrop','ngStorage','ui.router.state.events']);



app.controller('ctrl',['$scope','$modal',function ($scope,$modal) {
	$scope.selectedValue = 'Select DataBase';

	$scope.dataBase = ['mongoDB','Sql'];

     $scope.list1 = {title: 'AngularJS - Drag Me'};
  $scope.list2 = {};

	$scope.connectDatabase = function (db) {
		// body...
		$scope.selectedValue = db;
		$("#myModal").modal('show');
	}


}]);

	


