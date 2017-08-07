app.controller('sidebarController',function ($scope,$state) {




$scope.closeSideBar = function () {
    
    $("#wrapper").toggleClass("active");
    $("#wrapper1").toggleClass("active");
}   

})