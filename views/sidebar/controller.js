app.controller('sidebarController',function ($scope,$state) {


$scope.ActiveFilters = [];

$scope.closeSideBar = function () {
    
    $("#wrapper").toggleClass("active");
    $("#wrapper1").toggleClass("active");
}   

  $scope.$on('sidebarValue', function (event, data) {
    console.log('broadcast',data); // My broad cast message

    $scope.sidebarValues = data;
  });

      $scope.checkedItems = function(IsChecked,Filter) {
      if (IsChecked) {
        $scope.ActiveFilters.push(Filter);
      }
      else {
        var indexz = $scope.ActiveFilters.indexOf(Filter);
        $scope.ActiveFilters.splice(indexz, 1);
      }
      console.log($scope.ActiveFilters)
    }

    

})